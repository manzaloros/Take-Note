import React from 'react';
import { ModalStyle } from './Styles';

const Modal = ({
  handleSubmit,
  handleChange,
  handleShow,
  isGameOver,
  highscores,
  highscore,
}) => {
  const scores = highscores.map((user) => <section key={user.name}>{`${user.name} ${user.highscore}`}</section>);
  const closeModal = <button type="button" onClick={handleShow}>Close Modal</button>;

  return isGameOver
    ? (
      <ModalStyle>
        Game Over! Score: {highscore}
        <br />
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input type="text" onChange={handleChange} />
          </label>
          <input type="submit" value="submit" />
          {closeModal}
        </form>
        High Scores:
        {scores}
      </ModalStyle>
    )
    : (
      <ModalStyle>
        High Scores:
        {scores}
        {closeModal}
      </ModalStyle>
    );
};

export default Modal;
