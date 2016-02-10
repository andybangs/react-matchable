import React, { PropTypes } from 'react';
import Tile from './Tile';
import { PLAYING, END } from '../constants/gameStates';

const Paused = (props) => {
  const { guessesRemaining, correct, wrong, setGameState } = props;

  function play() {
    setGameState(PLAYING);
  }

  function quit() {
    setGameState(END);
  }

  return (
    <div style={styles.container}>

      <div style={styles.top}>
        <Tile header="Remaining" value={guessesRemaining} />
        <Tile header="Correct" value={correct} />
        <Tile header="Wrong" value={wrong} />
        <button onClick={play}>Resume</button>
      </div>

      <div style={styles.bottom}>
        <h3>Phew! Take a breath.</h3>
        <button onClick={quit}>I'm over it!</button>
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
    flexFlow: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  state: {
    color: '#ed6868',
  },
};

Paused.propTypes = {
  guessesRemaining: PropTypes.number.isRequired,
  correct: PropTypes.number.isRequired,
  wrong: PropTypes.number.isRequired,
  setGameState: PropTypes.func.isRequired,
};

export default Paused;
