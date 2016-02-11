import React, { PropTypes } from 'react';
import Tile from './Tile';
import { RESET } from '../constants/quiz';

const End = (props) => {
  const { correct, quizLength, reset } = props;

  function retry() {
    reset(RESET);
  }

  // calcScore :: Number -> Number -> String
  function calcScore(numCorrect, numTotal) {
    return `${Math.round(Math.round((numCorrect / numTotal) * 1000) / 10)}%`;
  }

  return (
    <div style={styles.container}>

      <div style={styles.top}>
        <Tile header="You got" value={calcScore(correct, quizLength)} />
        <Tile header="Score" value={`${correct}/${quizLength}`} />
        <button onClick={retry}>Try Again</button>
      </div>

      <div style={styles.bottom}>
        <h3>Quiz results go here!</h3>
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
  },
  bottom: {
    height: '85%',
    display: 'flex',
    justifyContent: 'center',
  },
};

End.propTypes = {
  correct: PropTypes.number.isRequired,
  quizLength: PropTypes.number.isRequired,
  reset: PropTypes.func.isRequired,
};

export default End;
