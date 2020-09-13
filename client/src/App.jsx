import React, { Component } from 'react';
import * as Tone from 'tone';
import GridContainer from './GridContainer';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    // Tone.context.resume();
  }

  render() {
    return (
      <div>
        <GridContainer />
      </div>
    );
  }
}

export default App;
