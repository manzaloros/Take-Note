import React from 'react';
import * as Tone from 'tone';
import { NoteBox, Grid } from './Styles';

const GridContainer = ({
  handleClick,
  scaleArray,
  round,
}) => {
  const colors = {
    A3: 'rgb(174,0,0)',
    B3: 'rgb(255,0,0)',
    Csharp4: 'rgb(255,239,0)',
    D4: 'rgb(153,255,0)',
    E4: 'rgb(0,255,242)',
    Fsharp4: 'rgb(5,0,255)',
    G4: 'rgb(255, 0, 0)',
    Gsharp4: 'rgb(71,0,237)',
    A4: 'rgb(99,0,178)',
  };

  const synth = new Tone.Synth().toDestination();

  const playSynth = (note, time) => {
    synth.triggerAttackRelease(note, time);
  };

  // Shuffle array after first round:
  // If you only want to shuffle per round, track which round you're on.
  let shuffled;
  if (round !== 1) {
    const shuffle = (originalArray) => {
      const array = [].concat(originalArray);
      let currentIndex = array.length;
      let temporaryValue;
      let randomIndex;
      while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }

      return array;
    };
    shuffled = shuffle(scaleArray);
  } else {
    shuffled = scaleArray;
  }

  return (
    <Grid>
      {shuffled.map((note) => {
        const backgroundColor = (() => {
          if (note.includes('#')) {
            const sharped = note.replace('#', 'sharp');
            return colors[sharped];
          }
          return colors[note];
        })();

        return (
          <NoteBox
            key={note}
            style={{ backgroundColor }}
            onClick={() => {
              handleClick(note);
              playSynth(note, '4n');
            }}
          />
        );
      })}
    </Grid>
  );
};

export default GridContainer;
