import React, { PropTypes } from 'react';
import Tile from './Tile';
import Timer from './Timer';
import Button from './Button';
import { PLAYING, END } from '../constants/gameStates';

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

      <div style={styles.header}>
        <Tile header="Guesses" value={guessesRemaining} />
        <Tile header="Correct" value={correct} />
        <Tile header="Wrong" value={wrong} />
        <Timer timerSeconds={timerSeconds} />
        <Button clickHandler={play}>Resume</Button>
      </div>

      <div style={styles.body}>
        <span style={styles.message}>Phew! Take a breath.</span>
        <Button clickHandler={quit}>I'm over it!</Button>
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
  header: {
    height: '15%',
    display: 'flex',
    flexFlow: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  body: {
    height: '85%',
    display: 'flex',
    flexFlow: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  message: {
    margin: '25px 0 25px 0',
    fontWeight: '700',
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
