import React from 'react';
import { ModalStyle } from './Styles';

const Modal = ({ handleSubmit, handleChange, handleShow, isGameOver }) => {
  if (isGameOver) {
    return <ModalStyle>Game over!</ModalStyle>;
  }
  return (
    <ModalStyle>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" onChange={handleChange} />
        </label>
        <input type="submit" value="submit" />
      </form>
      <button type="button" onClick={handleShow}>Close Modal</button>
    </ModalStyle>
  );
};

export default Modal;
