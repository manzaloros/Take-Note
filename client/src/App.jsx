import React, { Component } from 'react';
import GridContainer from './GridContainer';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expectedClick: '',
      scaleArray: ['A3', 'B3', 'C#4', 'D4', 'E4', 'F#4', 'G#4', 'A4'],
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    const { scaleArray } = this.state;
    // Set first note of scale:
    this.setState({ expectedClick: scaleArray[0] });
  }

  handleClick(note) {
    const { expectedClick, scaleArray } = this.state;
    const length = scaleArray.length - 1;
    console.log("note at length", note, scaleArray[length])
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

  render() {
    const { scaleArray } = this.state;
    return (
      <div>
        <GridContainer handleClick={this.handleClick} scaleArray={scaleArray} />
      </div>
    );
  }
}

export default App;
