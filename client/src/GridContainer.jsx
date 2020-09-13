import React from 'react';
import * as Tone from 'tone';
import { NoteBox, Grid } from './Styles';

const GridContainer = ({ handleClick, scaleArray }) => {
  const colors = {
    A3: 'rgb(255, 102, 0)',
    B3: 'rgb(153, 255, 0)',
    Csharp4: 'rgb(0, 255, 242)',
    D4: 'rgb(0, 122, 255)',
    E4: 'rgb(71, 0, 237)',
    Fsharp4: 'rgb(174, 0, 0)',
    Gsharp4: 'rgb(255, 0, 0)',
    A4: 'rgb(255, 102, 0)',
  };

  const synth = new Tone.Synth().toDestination();

  const playSynth = (note, time) => {
    synth.triggerAttackRelease(note, time);
  };

  return (
    <Grid>
      {scaleArray.map((note) => {
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
              playSynth(note, '8n');
            }}
          />
        );
      })}
    </Grid>
  );
};

export default GridContainer;
