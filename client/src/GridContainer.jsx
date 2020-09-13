import React from 'react';
import * as Tone from 'tone';
import { NoteBox, Grid } from './Styles';

const GridContainer = () => {
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
  const scaleArray = [['A3', '8n'], ['B3', '8n'], ['C#4', '8n'], ['D4', '8n'], ['E4', '8n'], ['F#4', '8n'], ['G#4', '8n'], ['A4', '8n']];
  const playSynth = ([note, time]) => {
    synth.triggerAttackRelease(note, time);
  };
  return (
    <Grid>
      {scaleArray.map((note) => {
        const backgroundColor = (() => {
          if (note[0].includes('#')) {
            const sharped = note[0].replace('#', 'sharp');
            return colors[sharped];
          }
          return colors[note[0]];
        })();

        return <NoteBox style={{ backgroundColor }} onClick={playSynth.bind(this, note)} />;
      })}
    </Grid>
  );
};
export default GridContainer;
