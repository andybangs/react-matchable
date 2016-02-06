import React, { PropTypes } from 'react';
import { PLAYING, END } from '../constants/gameStates';

const Paused = (props) => {
  const { gameState, setGameState } = props;

  function play() {
    setGameState(PLAYING);
  }

  function quit() {
    setGameState(END);
  }

  return (
    <div style={styles.container}>

      <div style={styles.top}>
        <h3 style={styles.state}>Game State: {gameState}</h3>
      </div>

      <div style={styles.bottom}>
        <button style={styles.btn} onClick={play}>Resume</button>
        <button style={styles.btn} onClick={quit}>Quit</button>
      </div>

    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexFlow: 'column',
    alignItems: 'center',
  },
  top: {
    flex: 1,
  },
  bottom: {
    flex: 4,
  },
  state: {
    color: '#ed6868',
  },
};

Paused.propTypes = {
  gameState: PropTypes.string.isRequired,
  setGameState: PropTypes.func.isRequired,
};

export default Paused;
