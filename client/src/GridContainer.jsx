import React from 'react';
import * as Tone from 'tone';
import { NoteBox, Grid } from './Styles';

const GridContainer = () => {
  const synth = new Tone.Synth().toDestination();
  const scaleArray = [['A4', '8n'], ['B4', '8n'], ['C#5', '8n'], ['D4', '8n'], ['E4', '8n'], ['F#4', '8n'], ['G#4', '8n'], ['A4', '8n']];
  const playSynth = ([note, time]) => {
    Tone.start();
    synth.triggerAttackRelease(note, time);
  };
  return (
    <Grid>
      {scaleArray.map((note, i) => <NoteBox key={i} onClick={playSynth.bind(this, note)} />)}
    </Grid>
  );
};
export default GridContainer;
