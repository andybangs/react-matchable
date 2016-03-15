import React, { PropTypes } from 'react';
import { PLAYING } from '../constants/gameStates';
import PausedBody from './PausedBody';
import Tile from './Tile';
import Timer from './Timer';
import Button from './Button';

const Paused = (props) => {
  const {
    guessesRemaining,
    correct,
    wrong,
    timerSeconds,
    setState,
  } = props;

  function play() {
    setState(PLAYING);
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
        <PausedBody setState={setState} />
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
    borderTop: '2px solid #665e5e',
    borderBottom: '2px solid #665e5e',
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
  setState: PropTypes.func.isRequired,
};

export default Paused;
