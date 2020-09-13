import React, { Component } from 'react';
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
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleTimeUp = this.handleTimeUp.bind(this);
  }

  componentDidMount() {
    const { scaleArray } = this.state;
    // Set first note of scale:
    this.setState({ expectedClick: scaleArray[0] });
  }

  handleClick(note) {
    const { expectedClick, scaleArray } = this.state;
    const length = scaleArray.length - 1;
    console.log('note at end of array:', note, scaleArray[length]);
    if (note !== expectedClick) {
      // Game over
      console.log('game over!');
    } else if (note === expectedClick) {
      this.setState({ expectedClick: scaleArray[scaleArray.indexOf(note) + 1] }, () => {
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
    const { isGameOver } = this.state;
    this.setState({ isGameOver: !isGameOver, show: true });
    console.log('Time up, game over!');
  }

  handleSubmit() {

  }

  render() {
    const { scaleArray, show, isGameOver } = this.state;
    return (
      <div>
        <CountdownTimer handleTimeUp={this.handleTimeUp} />
        <ModalOverlay style={{ display: show ? 'block' : 'none' }}>
          <Modal
            handleSubmit={this.handleSubmit}
            handleChange={this.handleChange}
            handleShow={this.handleShow}
            isGameOver={isGameOver}
          />
        </ModalOverlay>
        <GridContainer
          handleClick={this.handleClick}
          scaleArray={scaleArray}
        />
        <button type="button" onClick={this.handleShow}>Open Modal</button>
      </div>
    );
  }
}

export default App;
