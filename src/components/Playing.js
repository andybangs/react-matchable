import React, { PropTypes } from 'react';
import Tile from './Tile';
import Timer from './Timer';
import Button from './Button';
import QuizBody from './QuizBody';
import { PAUSED } from '../constants/gameStates';

const Playing = (props) => {
  const {
    gameState,
    itemIds,
    columns,
    guessesRemaining,
    correct,
    wrong,
    attempted,
    timerSeconds,
    setGameState,
    selectItem,
  } = props;

  function pause() {
    setGameState(PAUSED);
  }

  return (
    <div style={styles.container}>

      <div style={styles.header}>
        <Tile header="Guesses" value={guessesRemaining} />
        <Tile header="Correct" value={correct} />
        <Tile header="Wrong" value={wrong} />
        <Timer timerSeconds={timerSeconds} />
        <Button clickHandler={pause}>Pause</Button>
      </div>

      <div style={styles.body}>
        <QuizBody
          gameState={gameState}
          itemIds={itemIds}
          columns={columns}
          action={selectItem}
          attempted={attempted}
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

Playing.propTypes = {
  gameState: PropTypes.string.isRequired,
  itemIds: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  guessesRemaining: PropTypes.number.isRequired,
  correct: PropTypes.number.isRequired,
  wrong: PropTypes.number.isRequired,
  attempted: PropTypes.array.isRequired,
  timerSeconds: PropTypes.number.isRequired,
  setGameState: PropTypes.func.isRequired,
  selectItem: PropTypes.func.isRequired,
};

export default Playing;
