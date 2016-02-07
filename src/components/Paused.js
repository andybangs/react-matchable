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
        <button onClick={play}>Resume</button>
        <button onClick={quit}>Quit</button>
      </div>

    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexFlow: 'column',
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  top: {
    height: '15%',
    display: 'flex',
    flexFlow: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  bottom: {
    height: '85%',
    display: 'flex',
    flexFlow: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
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
