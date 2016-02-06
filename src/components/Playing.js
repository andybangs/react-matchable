import React, { PropTypes } from 'react';
import Tile from './Tile';
import { PAUSED } from '../constants/gameStates';

const Playing = (props) => {
  const { guessesRemaining, correct, wrong, setGameState } = props;

  function pause() {
    setGameState(PAUSED);
  }

  return (
    <div style={styles.container}>

      <div style={styles.top}>
        <Tile header="Remaining" value={guessesRemaining} />
        <Tile header="Correct" value={correct} />
        <Tile header="Wrong" value={wrong} />
        <button onClick={pause}>Pause</button>
      </div>

      <div style={styles.bottom}>
        <h1>Quiz stuff goes here!</h1>
      </div>

    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexFlow: 'column',
    alignItems: 'stretch',
  },
  top: {
    height: '10%',
    display: 'flex',
    flexFlow: 'row',
    alignItems: 'stretch',
    justifyContent: 'space-around',
    backgroundColor: '#b1e3fb',
  },
  bottom: {
    height: '90%',
    display: 'flex',
    justifyContent: 'center',
  },
};

Playing.propTypes = {
  guessesRemaining: PropTypes.number.isRequired,
  correct: PropTypes.number.isRequired,
  wrong: PropTypes.number.isRequired,
  setGameState: PropTypes.func.isRequired,
};

export default Playing;
