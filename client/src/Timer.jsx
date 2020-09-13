import React, { Component } from 'react';

class Timer extends Component {
  constructor() {
    super();
    this.state = { time: {}, seconds: 5 };
    this.timer = 0;
    this.startTimer = this.startTimer.bind(this);
    this.countDown = this.countDown.bind(this);
  }

  componentDidMount() {
    const timeLeftVar = this.secondsToTime(this.state.seconds);
    this.setState({ time: timeLeftVar });
  }

  secondsToTime(secs) {
    this.hours = Math.floor(secs / (60 * 60));

    this.divisorForMinutes = secs % (60 * 60);
    this.minutes = Math.floor(this.divisorForMinutes / 60);

    this.divisorForSeconds = this.divisorForMinutes % 60;
    this.seconds = Math.ceil(this.divisorForSeconds);

    this.obj = {
      h: this.hours,
      m: this.minutes,
      s: this.seconds,
    };
    return this.obj;
  }

  startTimer() {
    if (this.timer === 0 && this.state.seconds > 0) {
      this.timer = setInterval(this.countDown, 1000);
    }
  }

  countDown() {
    // Remove one second, set state so a re-render happens.
    const seconds = this.state.seconds - 1;
    this.setState({
      time: this.secondsToTime(seconds),
      seconds,
    });

    // Check if we're at zero.
    if (seconds === 0) {
      clearInterval(this.timer);
    }
  }

  render() {
    return (
      <div>
        <button type="button" onClick={this.startTimer}>Start</button>
        m:
        {' '}
        {this.state.time.m}
        {' '}
        s:
        {' '}
        {this.state.time.s}
      </div>
    );
  }
}

export default Timer;
