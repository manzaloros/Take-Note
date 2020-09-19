import styled, { createGlobalStyle } from 'styled-components';
import OldSchoolAdventures from './icons/OldSchoolAdventures-42j9.ttf';
import Cursor from './icons/cursor.png';

const PageWrapper = styled.div`
  color: rgb(243, 226, 196);
  cursor: url(${Cursor}), auto;
`;

const GlobalStyle = createGlobalStyle`
@font-face {
  font-family: 'OldSchoolAdventures';
  src: local('OldSchoolAdventures'), local('OldSchoolAdventures'),
  url(${OldSchoolAdventures}) format('truetype');
  font-weight: 300;
  font-style: normal;
}
body {
  background-color: black;
  font-size: large;
}
button, select {
  font-family: 'OldSchoolAdventures';
  padding: 10px;
}
`;

const TimerScoreGrid = styled.section`
  display: grid;
  grid-template-areas: left right;
  font-family: 'OldSchoolAdventures';
`;

const NoteBox = styled.div`
  width: 30vw;
  height: 30vw;
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
  text-align: center;
  font-family: 'OldSchoolAdventures';
  `;

const ModalStyle = styled.section`
  border-style: solid;
  border-width: 4px;
  border-color: rgb(243, 226, 196);
  position:fixed;
  background: black;
  width: 80%;
  height: auto;
  top:50%;
  left:50%;
  transform: translate(-50%,-50%);
  padding: 20px;
`;

export {
  NoteBox, Grid, ModalOverlay, ModalStyle, TimerScoreGrid, GlobalStyle, PageWrapper,
};
