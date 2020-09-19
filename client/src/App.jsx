import React, { Component } from 'react';
import axios from 'axios';
import GridContainer from './GridContainer';
import CountdownTimer from './Timer';
import {
  ModalOverlay, TimerScoreGrid, GlobalStyle, PageWrapper,
} from './Styles';
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
      round: 1,
      scaleType: 'major',
    };
    this.handleClick = this.handleClick.bind(this);
    this.fetchHighScores = this.fetchHighScores.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleTimeUp = this.handleTimeUp.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleResetGame = this.handleResetGame.bind(this);
    this.changeScale = this.changeScale.bind(this);
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
      .catch((error) => { console.log(error); });
  }

  handleClick(note) {
    const {
      expectedClick,
      scaleArray,
      hasGameStarted,
      round,
    } = this.state;
    let { highscore } = this.state;

    // Starts timer when user clicks first block:
    if (!hasGameStarted) {
      this.setState({ hasGameStarted: true });
    }

    const length = scaleArray.length - 1;
    if (note !== expectedClick) {
      // Game over. Could also just not add to score instead of instantly ending game:
      // this.setState({ isGameOver: true, show: true });

      // Subtract from high score if wrong note:
      this.setState({ highscore: highscore > 0 ? highscore -= 1 : 0 });
    } else if (note === expectedClick) {
      // If correct, increment high score with round multiplier:
      this.setState({
        expectedClick: scaleArray[scaleArray.indexOf(note) + 1],
        highscore: (highscore = (highscore * round) + 1),
      }, () => {
        if (note === scaleArray[length]) {
          // Keep track of how many wins? Requires back end refactor
          this.handleTimeUp();
        }
      });
    }
  }

  handleShow() {
    const { show } = this.state;
    this.setState({ show: !show });
  }

  handleTimeUp() {
    const { scaleArray } = this.state;
    let { round } = this.state;
    this.setState({
      isGameOver: true,
      show: true,
      hasGameStarted: false,
      expectedClick: scaleArray[0],
      round: round += 1,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { name, highscore } = this.state;
    // Send user name and score to DB
    axios.post('/', { name, highscore })
      .then(() => {
        this.fetchHighScores();
      })
      .then(() => {
        this.handleResetGame();
      })
      .catch((error) => console.log(error.stack));
  }

  handleResetGame() {
    const { scaleArray } = this.state;
    this.setState({
      isGameOver: false,
      hasGameStarted: false,
      expectedClick: scaleArray[0],
      highscore: 0,
    });
  }

  handleChange(e) {
    e.preventDefault();
    this.setState({ name: e.target.value });
  }

  changeScale(e) {
    e.preventDefault();
    const scale = e.target.value;
    const scales = {
      major: ['A3', 'B3', 'C#4', 'D4', 'E4', 'F#4', 'G#4', 'A4'],
      minor: ['A3', 'B3', 'C4', 'D4', 'E4', 'F#4', 'G#4', 'A4'],
      lydian: ['A3', 'B3', 'C#4', 'D#4', 'E4', 'F#4', 'G#4', 'A4'],
      octatonic: ['A3', 'Bb3', 'C4', 'C#4', 'D#4', 'E4', 'F#4', 'G4'],
    };
    this.setState({
      scaleArray: scales[scale], scaleType: scale, round: 1,
    }, () => this.handleResetGame());
  }

  render() {
    const {
      scaleArray,
      show,
      isGameOver,
      hasGameStarted,
      highscores,
      highscore,
      round,
      scaleType,
    } = this.state;
    return (
      <PageWrapper>
        <GlobalStyle />
        <TimerScoreGrid>
          <CountdownTimer handleTimeUp={this.handleTimeUp} hasGameStarted={hasGameStarted} />
          <div>
            {`Score: ${highscore}`}
          </div>
        </TimerScoreGrid>
        <ModalOverlay style={{ display: show ? 'block' : 'none' }}>
          <Modal
            handleSubmit={this.handleSubmit}
            handleChange={this.handleChange}
            handleShow={this.handleShow}
            handleResetGame={this.handleResetGame}
            isGameOver={isGameOver}
            highscores={highscores}
            highscore={highscore}
          />
        </ModalOverlay>
        <GridContainer
          handleClick={this.handleClick}
          scaleArray={scaleArray}
          round={round}
        />
        <button type="button" onClick={this.handleShow}>High Scores</button>
        <label>
          <select value={scaleType} onChange={this.changeScale}>
            <option value="major">Major</option>
            <option value="minor">Minor</option>
            <option value="lydian">Lydian</option>
            <option value="octatonic">Octatonic</option>
          </select>
        </label>
      </PageWrapper>
    );
  }
}

export default App;
