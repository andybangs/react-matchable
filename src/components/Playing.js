import React, { PropTypes } from 'react';
import { flatten } from 'lodash';
import cL from 'classnames';
import Tile from './Tile';
import { PAUSED } from '../constants/gameStates';

const Playing = (props) => {
  const {
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

  function select(i) {
    selectItem(i.mid, i.id);
  }

  // buildItem :: Item -> Bool -> [mid :: Number, id :: Number] -> Func -> JSX
  function buildItem(item, isMatched, attemptedItem, handleItemClick) {
    function handleClick() {
      handleItemClick(item);
    }

    return (
      <li key={`${item.mid}-${item.id}`}
        onClick={handleClick}
        className={cL(
          { 'selected': item.selected },
          { 'matched': isMatched },
          { 'attempted': attemptedItem[0] === item.mid }
        )}
      >{item.value}</li>
    );
  }

  // buildColumn :: Array Matchable -> [mid :: Number, id :: Number] -> JSX
  function buildColumn(columnArr, attemptedItem) {
    const items = columnArr.map(m => buildItem(m.items[0], m.matched, attemptedItem, select));

    return <ul style={styles.ul}>{items}</ul>;
  }

  const leftAttempt = attempted.length > 0 ? flatten(attempted.filter(arr => arr[1] === 0)) : [];
  const rightAttempt = attempted.length > 0 ? flatten(attempted.filter(arr => arr[1] === 1)) : [];

  const leftColumn = buildColumn(columns[0], leftAttempt);
  const rightColumn = buildColumn(columns[1], rightAttempt);

  return (
    <div style={styles.container}>

      <div style={styles.top}>
        <Tile header="Remaining" value={guessesRemaining} />
        <Tile header="Correct" value={correct} />
        <Tile header="Wrong" value={wrong} />
        <Tile header="Time" value={timerSeconds} />
        <button onClick={pause}>Pause</button>
      </div>

      <div style={styles.bottom}>
        <div style={styles.divider}></div>
        {leftColumn}
        <div style={styles.divider}></div>
        {rightColumn}
        <div style={styles.divider}></div>
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
    flexFlow: 'row',
    alignItems: 'center',
  },
  divider: {
    flex: 1,
  },
  ul: {
    flex: 7,
    height: '90%',
    padding: 0,
    margin: 0,
    listStyle: 'none',
    display: 'flex',
    flexFlow: 'row',
    flexWrap: 'wrap',
    alignContent: 'flex-start',
    justifyContent: 'center',
  },
};

Playing.propTypes = {
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
