import React, { Component } from 'react';
import GridContainer from './GridContainer';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
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
