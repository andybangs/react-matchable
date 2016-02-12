import React, { PropTypes } from 'react';
import Tile from './Tile';
import { PLAYING, END } from '../constants/gameStates';
import formatTime from '../util/formatTime';

const Paused = (props) => {
  const { guessesRemaining, correct, wrong, timerSeconds, setGameState } = props;

  function play() {
    setGameState(PLAYING);
  }

  function quit() {
    setGameState(END);
  }

  return (
    <div style={styles.container}>

      <div style={styles.top}>
        <Tile header="Guesses Remaining" value={guessesRemaining} />
        <Tile header="Correct" value={correct} />
        <Tile header="Wrong" value={wrong} />
        <Tile header="Timer" value={formatTime(timerSeconds)} />
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
};

Paused.propTypes = {
  guessesRemaining: PropTypes.number.isRequired,
  correct: PropTypes.number.isRequired,
  wrong: PropTypes.number.isRequired,
  timerSeconds: PropTypes.number.isRequired,
  setGameState: PropTypes.func.isRequired,
};

export default Paused;
