import React from 'react';
import { ModalStyle } from './Styles';

const Modal = ({
  handleSubmit,
  handleChange,
  handleShow,
  isGameOver,
}) => (isGameOver
  ? <ModalStyle>Game over!</ModalStyle>
  : (
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
  ));

export default Modal;
