import React, { PropTypes } from 'react';
import { head } from 'lodash';
import calcScore from '../util/calcScore';
import Tile from './Tile';
import Timer from './Timer';
import Button from './Button';
import QuizBody from './QuizBody';

const End = (props) => {
  const {
    gameState,
    itemIds,
    columns,
    correct,
    timerSeconds,
    toggleFocus,
    resetState,
  } = props;

  const quizLength = head(columns).length;

  return (
    <div style={styles.container}>

      <div style={styles.header}>
        <Tile header="You got" value={calcScore(correct, quizLength)} />
        <Tile header="Score" value={`${correct}/${quizLength}`} />
        <Timer timerSeconds={timerSeconds} />
        <Button clickHandler={resetState}>Try Again</Button>
      </div>

      <div style={styles.body}>
        <QuizBody
          gameState={gameState}
          itemIds={itemIds}
          columns={columns}
          action={toggleFocus}
        />
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
    flexFlow: 'row',
    alignItems: 'center',
  },
};

End.propTypes = {
  gameState: PropTypes.string.isRequired,
  itemIds: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  correct: PropTypes.number.isRequired,
  timerSeconds: PropTypes.number.isRequired,
  toggleFocus: PropTypes.func.isRequired,
  resetState: PropTypes.func.isRequired,
};

export default End;
