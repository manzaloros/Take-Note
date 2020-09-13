import React from 'react';
import Timer from 'react-compound-timer';

const CountdownTimer = ({ handleTimeUp }) => (
  <Timer
    initialTime={3000}
    startImmediately={false}
    direction="backward"
    checkpoints={[{ time: 0, callback: handleTimeUp }]}
  >
    {({ start }) => (
      <div>
        <div>
          <Timer.Seconds />
          {' '}
          seconds
        </div>
        <br />
        <div>
          <button type="button" onClick={start}>Start</button>
        </div>
      </div>
    )}
  </Timer>
);

export default CountdownTimer;
