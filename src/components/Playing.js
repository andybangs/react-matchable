import React, { PropTypes } from 'react';
import Radium from 'radium';
import Tile from './Tile';
import { flatten } from 'lodash';
import { PAUSED } from '../constants/gameStates';
import formatTime from '../util/formatTime';

const Playing = (props) => {
  const {
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

  // buildItem :: Item -> Bool -> [mid :: Number, id :: Number] -> JSX
  function buildItem(item, isMatched, attemptedItem) {
    const selected = item.selected ? 'selected' : '';
    const matched = isMatched ? 'matched' : '';
    const missed = attemptedItem[0] === item.mid ? 'missed' : '';

    function handleClick() {
      selectItem(item.mid, item.id);
    }

    return (
      <li key={`${item.mid}-${item.id}`}
        onClick={handleClick}
        style={[
          styles.li,
          styles[selected],
          styles[matched],
          styles[missed],
        ]}
      >{item.value}</li>
    );
  }

  // buildColumn :: Array Matchable -> Number -> [mid :: Number, id :: Number] -> JSX
  function buildColumn(columnArr, columnKey, attemptedItem) {
    const items = columnArr.map(m => buildItem(m.items[0], m.matched, attemptedItem));

    return <ul key={columnKey} style={styles.ul}>{items}</ul>;
  }

  // columns :: Array JSX
  const columnsArr = itemIds.map(id => {
    // attempt :: [mid, id] || []
    const attempt = attempted.length > 0 ? flatten(attempted.filter(arr => arr[1] === id)) : [];
    return buildColumn(columns[id], id, attempt);
  });

  return (
    <div style={styles.container}>

      <div style={styles.top}>
        <Tile header="Guesses Remaining" value={guessesRemaining} />
        <Tile header="Correct" value={correct} />
        <Tile header="Wrong" value={wrong} />
        <Tile header="Timer" value={formatTime(timerSeconds)} />
        <button onClick={pause}>Pause</button>
      </div>

      <div style={styles.bottom}>
        {columnsArr}
      </div>

    </div>
  );
};

const matchedKeyframes = Radium.keyframes({
  '0%': { backgroundColor: '#fff' },
  '22%': { backgroundColor: '#9ff5a9' },
  '77%': { backgroundColor: '#9ff5a9' },
  '100%': { backgroundColor: '#9ff5a9' },
}, 'matched');

const missedKeyframes = Radium.keyframes({
  '0%': { backgroundColor: '#f58471' },
  '22%': { backgroundColor: '#f58471' },
  '77%': { backgroundColor: '#f58471' },
  '100%': { backgroundColor: '#fff' },
}, 'missed');

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
  ul: {
    flex: 1,
    height: '90%',
    padding: 0,
    margin: 0,
    listStyle: 'none',
    display: 'flex',
    flexFlow: 'row',
    flexWrap: 'wrap',
    alignContent: 'flex-start',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  li: {
    backgroundColor: '#fff',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
    margin: 5,
    padding: 7,
    borderRadius: 4,
    textAlign: 'center',
    fontSize: '0.7em',
    cursor: 'pointer',
  },
  selected: {
    backgroundColor: '#fcffbd',
  },
  matched: {
    backgroundColor: '#9ff5a9',
    animationName: matchedKeyframes,
    animationDuration: '300ms',
    animationIterationCount: 1,
    animationTimingFunction: 'linear',
  },
  missed: {
    animationName: missedKeyframes,
    animationDuration: '300ms',
    animationIterationCount: 1,
    animationTimingFunction: 'linear',
  },
};

Playing.propTypes = {
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

export default Radium(Playing);
