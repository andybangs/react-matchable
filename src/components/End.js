import React, { PropTypes } from 'react';
import Tile from './Tile';
import { RESET } from '../constants/quiz';

const End = (props) => {
  const { correct, wrong, reset } = props;

  function retry() {
    reset(RESET);
  }

  return (
    <div style={styles.container}>

      <div style={styles.top}>
        <Tile header="Correct" value={correct} />
        <Tile header="Wrong" value={wrong} />
        <button onClick={retry}>Try Again</button>
      </div>

      <div style={styles.bottom}>
        <h1>Quiz results go here!</h1>
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
    height: '15%',
    display: 'flex',
    flexFlow: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#b1e3fb',
  },
  bottom: {
    height: '85%',
    display: 'flex',
    justifyContent: 'center',
  },
};

End.propTypes = {
  guessesRemaining: PropTypes.number.isRequired,
  correct: PropTypes.number.isRequired,
  wrong: PropTypes.number.isRequired,
  reset: PropTypes.func.isRequired,
};

export default End;
