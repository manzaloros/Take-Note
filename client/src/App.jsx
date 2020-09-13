import React, { Component } from 'react';
import GridContainer from './GridContainer';
import { ModalOverlay, ModalStyle } from './Styles';

class App extends Component {
  constructor() {
    super();
    this.state = {
      expectedClick: '',
      scaleArray: ['A3', 'B3', 'C#4', 'D4', 'E4', 'F#4', 'G#4', 'A4'],
      show: false,
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleShow = this.handleShow.bind(this);
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

  render() {
    const { scaleArray, show } = this.state;
    return (
      <div>
        <ModalOverlay style={{ display: show ? 'block' : 'none' }}>
          <ModalStyle>
            <h1>Hello from Modal</h1>
            <button type="button" onClick={this.handleShow}>Close Modal</button>
          </ModalStyle>
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
