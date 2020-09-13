import React from 'react';
import { ModalStyle } from './Styles';

const Modal = ({ show, handleShow }) => {
  const showHideDisplay = show ? 'block' : 'none';

  return (
    <ModalStyle style={{ display: showHideDisplay }}>
      <h1>Hello from Modal</h1>
      <button type="button" onClick={() => handleShow()}>Close Modal</button>
    </ModalStyle>
  );
};

export default Modal;
