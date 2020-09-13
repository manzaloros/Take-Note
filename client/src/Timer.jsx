import React from 'react';
import Timer from 'react-compound-timer';

const CountdownTimer = ({ handleTimeUp, hasGameStarted }) => (hasGameStarted
  ? (
    <Timer
      initialTime={3000}
      direction="backward"
      checkpoints={[{ time: 0, callback: handleTimeUp }]}
    >
      {() => (
        <div>
          <div>
            <Timer.Seconds />
            {' '}
            seconds
          </div>
          <br />
        </div>
      )}
    </Timer>
  )
  : <div />);

export default CountdownTimer;
