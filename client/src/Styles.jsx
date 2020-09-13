import styled from 'styled-components';

const NoteBox = styled.div`
  width: 400px;
  height: 400px;
  background-color: red;
  margin: 10px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: auto auto auto;
`;

export {
  NoteBox, Grid,
};
