import React, { Component } from 'react';
import axios from 'axios';
import GridContainer from './GridContainer';
import CountdownTimer from './Timer';
import { ModalOverlay } from './Styles';
import Modal from './Modal';

class App extends Component {
  constructor() {
    super();
    this.state = {
      expectedClick: '',
      scaleArray: ['A3', 'B3', 'C#4', 'D4', 'E4', 'F#4', 'G#4', 'A4'],
      show: false,
      isGameOver: false,
      hasGameStarted: false,
      name: '',
      highscore: 0,
      highscores: [],
    };
    this.handleClick = this.handleClick.bind(this);
    this.fetchHighScores = this.fetchHighScores.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleTimeUp = this.handleTimeUp.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const { scaleArray } = this.state;
    // Set first note of scale:
    this.setState({ expectedClick: scaleArray[0] });
    this.fetchHighScores();
  }

  fetchHighScores() {
    axios.get('/scores')
      .then((res) => {
        this.setState({ highscores: res.data });
      })
      .catch((error) => { console.log(error) });
  }

  handleClick(note) {
    const {
      expectedClick,
      scaleArray,
      hasGameStarted,
    } = this.state;
    let { highscore } = this.state;
    if (!hasGameStarted) {
      this.setState({ hasGameStarted: true });
    }

    const length = scaleArray.length - 1;
    console.log('note at end of array:', note, scaleArray[length]);

    if (note !== expectedClick) {
      // Game over. Could also just not add to score instead of instantly ending game:
      this.setState({ isGameOver: true, show: true });
      console.log('game over!');
    } else if (note === expectedClick) {
      // Correct note clicked:
      this.setState({
        expectedClick: scaleArray[scaleArray.indexOf(note) + 1],
        highscore: highscore += 1,
      }, () => {
        if (note === scaleArray[length]) {
          console.log('Win');
        }
      });
    }
  }

  handleShow() {
    const { show } = this.state;
    this.setState({ show: !show });
  }

  handleTimeUp() {
    this.setState({ isGameOver: true, show: true });
    console.log('Time up, game over!');
  }

  handleSubmit(e) {
    e.preventDefault();
    const { name, highscore } = this.state;
    // Send user name and score to DB
    axios.post('/', { name, highscore })
      .then(() => {
        this.fetchHighScores();
        this.setState({ isGameOver: false, hasGameStarted: false });
      })
      .catch((error) => console.log(error.stack));
  }

  handleChange(e) {
    e.preventDefault();
    this.setState({ name: e.target.value });
  }

  render() {
    const {
      scaleArray,
      show,
      isGameOver,
      hasGameStarted,
      highscores,
      highscore,
    } = this.state;
    return (
      <div>
        <CountdownTimer handleTimeUp={this.handleTimeUp} hasGameStarted={hasGameStarted} />
        <ModalOverlay style={{ display: show ? 'block' : 'none' }}>
          <Modal
            handleSubmit={this.handleSubmit}
            handleChange={this.handleChange}
            handleShow={this.handleShow}
            isGameOver={isGameOver}
            highscores={highscores}
            highscore={highscore}
          />
        </ModalOverlay>
        <GridContainer
          handleClick={this.handleClick}
          scaleArray={scaleArray}
        />
        <button type="button" onClick={this.handleShow}>High Scores</button>
      </div>
    );
  }
}

export default App;
