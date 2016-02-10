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
    setGameState,
    selectItem,
  } = props;

  function pause() {
    setGameState(PAUSED);
  }

  function select(i) {
    selectItem(i.mid, i.id);
  }

  // buildItem : Item -> Bool -> [mid, id] -> Func -> JSX
  function buildItem(item, isMatched, attemptedItem, handleItemClick) {
    function handleClick() {
      handleItemClick(item);
    }

    return (
      <li key={`${item.mid}-${item.id}`}
        onClick={handleClick}
        className={cL(
          'li',
          { 'selected': item.selected },
          { 'matched': isMatched },
          { 'attempted': attemptedItem[0] === item.mid }
        )}
      >{item.value}</li>
    );
  }

  // buildColumn : Array Matchable -> [mid : Number, id : Number] -> JSX
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
        <button onClick={pause}>Pause</button>
      </div>

      <div style={styles.bottom}>
        {leftColumn}
        {rightColumn}
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
    flexFlow: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  ul: {
    paddingLeft: 0,
    listStyle: 'none',
    display: 'flex',
    flexFlow: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
  },
};

Playing.propTypes = {
  columns: PropTypes.array.isRequired,
  guessesRemaining: PropTypes.number.isRequired,
  correct: PropTypes.number.isRequired,
  wrong: PropTypes.number.isRequired,
  attempted: PropTypes.array.isRequired,
  setGameState: PropTypes.func.isRequired,
  selectItem: PropTypes.func.isRequired,
};

export default Playing;
