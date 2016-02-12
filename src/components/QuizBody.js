import React, { PropTypes } from 'react';
import Radium from 'radium';
import { PLAYING, END } from '../constants/gameStates';
import { flatten, head } from 'lodash';

const QuizBody = (props) => {
  const {
    gameState,
    itemIds,
    columns,
    action,
    attempted,
  } = props;

  // buildPlayItem :: Item -> Bool -> [Item.mid, Item.id] -> JSX
  function buildPlayItem(item, isMatched, attemptedItem) {
    const matched = isMatched ? 'matchedAnimation' : '';
    const missed = head(attemptedItem) === item.mid ? 'missedAnimation' : '';
    const selected = item.selected ? 'selected' : '';

    function handleClick() {
      action(item.mid, item.id);
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

  // buildEndItem :: Item -> Bool -> Bool -> JSX
  function buildEndItem(item, isMatched, isFocused) {
    const color = isMatched ? 'matchedColor' : 'missedColor';
    const selected = isFocused ? 'selected' : '';

    function handleOnMouseOver() {
      action(item.mid);
    }

    function handleOnMouseLeave() {
      action(null);
    }

    return (
      <li key={`${item.mid}-${item.id}`}
        onMouseEnter={handleOnMouseOver}
        onMouseLeave={handleOnMouseLeave}
        style={[
          styles.li,
          styles[color],
          styles[selected],
        ]}
      >{item.value}</li>
    );
  }

  // buildColumn :: Array Matchable -> Number -> [mid :: Number, id :: Number] -> JSX
  function buildColumn(columnArr, columnKey, attemptedItem) {
    switch (gameState) {
      case PLAYING:
        const playItems = columnArr.map(m => {
          const i = head(m.items);
          return buildPlayItem(i, m.matched, attemptedItem);
        });

        return <ul key={columnKey} style={styles.ul}>{playItems}</ul>;

      case END:
        const endItems = columnArr.map(m => {
          const i = head(m.items);
          return buildEndItem(i, m.matched, i.focused);
        });

        return <ul key={columnKey} style={styles.ul}>{endItems}</ul>;

      default:
        return console.error('gameState must be PLAYING or END');
    }
  }

  // columns :: Array JSX
  const columnsArr = itemIds.map(id => {
    // attempt :: [mid, id] || []
    const attempt = attempted && attempted.length > 0 ?
      flatten(attempted.filter(arr => arr[1] === id)) :
      [];

    return buildColumn(columns[id], id, attempt);
  });

  return (
    <div style={styles.container}>
        {columnsArr}
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
    cursor: 'pointer',
  },
  selected: {
    backgroundColor: '#fcffbd',
  },
  matchedAnimation: {
    backgroundColor: '#9ff5a9',
    animationName: matchedKeyframes,
    animationDuration: '300ms',
    animationIterationCount: 1,
    animationTimingFunction: 'linear',
  },
  missedAnimation: {
    animationName: missedKeyframes,
    animationDuration: '300ms',
    animationIterationCount: 1,
    animationTimingFunction: 'linear',
  },
  matchedColor: {
    backgroundColor: '#9ff5a9',
  },
  missedColor: {
    backgroundColor: '#f58471',
  },
};

QuizBody.propTypes = {
  gameState: PropTypes.string.isRequired,
  itemIds: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  action: PropTypes.func.isRequired,
  attempted: PropTypes.array,
};

export default Radium(QuizBody);
