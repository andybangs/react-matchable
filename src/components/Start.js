import React, { PropTypes } from 'react';
import { PLAYING } from '../constants/gameStates';

const Start = (props) => {
  const { title, description, gameState, setGameState } = props;

  function play() {
    setGameState(PLAYING);
  }

  return (
    <div style={styles.container}>

      <div style={styles.top}>
        <h3 style={styles.state}>Game State: {gameState}</h3>
      </div>

      <div style={styles.middle}>
        <h2 style={styles.title}>{title}</h2>
        <h3 style={styles.description}>{description}</h3>
      </div>

      <div style={styles.bottom}>
        <button style={styles.btn} onClick={play}>Play</button>
      </div>

    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexFlow: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  top: {
    flex: 1,
  },
  middle: {
    flex: 2,
    display: 'flex',
    flexFlow: 'column',
    alignItems: 'center',
  },
  bottom: {
    flex: 2,
  },
  state: {
    color: '#ed6868',
  },
};

Start.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  gameState: PropTypes.string.isRequired,
  setGameState: PropTypes.func.isRequired,
};

export default Start;
