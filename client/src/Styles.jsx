import styled from 'styled-components';

const TimerScoreGrid = styled.section`
  display: grid;
  grid-template-areas: left right;
`;

const NoteBox = styled.div`
  width: 400px;
  height: 400px;
  margin: 10px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: auto auto auto;
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width:100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
`;

const ModalStyle = styled.section`
  position:fixed;
  background: white;
  width: 80%;
  height: auto;
  top:50%;
  left:50%;
  transform: translate(-50%,-50%);
`;

export {
  NoteBox, Grid, ModalOverlay, ModalStyle, TimerScoreGrid,
};
