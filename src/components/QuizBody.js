import React, { PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Radium from 'radium';
import { flatten, head } from 'lodash';
import { PLAYING, END } from '../constants/gameStates';

// buildPlayItem :: Item -> Bool -> [Item.mid, Item.id] -> Func -> JSX
function buildPlayItem(item, isMatched, attemptedItem, action) {
  const matched = isMatched ? 'matchedAnimation' : '';
  const missed = head(attemptedItem) === item.mid ? 'missedAnimation' : '';
  const selected = item.selected ? 'selectedColor' : '';

  function handleClick() {
    action(item.mid, item.id);
  }

  return (
    <li key={`${item.mid}-${item.id}`}
      onClick={handleClick}
      className={missed}
      style={[
        styles.li,
        styles[selected],
        styles[matched],
        styles[missed],
      ]}
    >{item.value}</li>
  );
}

// buildEndItem :: Item -> Bool -> Bool -> Func -> JSX
function buildEndItem(item, isMatched, isFocused, action) {
  const color = isMatched ? 'matchedColor' : 'missedColor';
  const selected = isFocused ? 'selectedColor' : '';

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

// buildColumn :: Array Matchable -> Number -> [Item.mid, Item.id] -> String -> Func -> JSX
function buildColumn(columnArr, columnKey, attemptedItem, gameState, action) {
  switch (gameState) {
    case PLAYING:
      const playItems = columnArr.map(m => {
        const i = head(m.items);
        return buildPlayItem(i, m.matched, attemptedItem, action);
      });

      return <ul key={columnKey} style={styles.ul}>{playItems}</ul>;

    case END:
      const endItems = columnArr.map(m => {
        const i = head(m.items);
        return buildEndItem(i, m.matched, i.focused, action);
      });

      return <ul key={columnKey} style={styles.ul}>{endItems}</ul>;

    default:
      return console.error('gameState must be PLAYING or END');
  }
}

const QuizBody = (props) => {
  const {
    gameState,
    itemIds,
    columns,
    action,
    attempted,
  } = props;

  // columns :: Array JSX
  const columnsArr = itemIds.map(id => {
    // attempt :: [Item.mid, Item.id] || []
    const attempt = attempted && attempted.length > 0 ?
      flatten(attempted.filter(arr => arr[1] === id)) :
      [];

    return buildColumn(columns[id], id, attempt, gameState, action);
  });

  return (
    <ReactCSSTransitionGroup
      transitionName="initial"
      transitionAppear={true}
      transitionAppearTimeout={500}
    >
      <div style={styles.container}>{columnsArr}</div>
    </ReactCSSTransitionGroup>
  );
};

const matchedKeyframes = Radium.keyframes({
  '0%': { backgroundColor: '#fff' },
  '22%': { backgroundColor: '#9ff5a9' },
  '77%': { backgroundColor: '#9ff5a9' },
  '100%': { backgroundColor: '#9ff5a9' },
}, 'matched');

const missedKeyframes = Radium.keyframes({
  '0%': { backgroundColor: '#ff9684' },
  '22%': { backgroundColor: '#ff9684' },
  '77%': { backgroundColor: '#ff9684' },
  '100%': { backgroundColor: '#fff' },
}, 'missed');

const styles = {
  container: {
    display: 'flex',
    flexFlow: 'row',
    alignItems: 'center',
  },
  ul: {
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
    backgroundColor: '#fcfcfc',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
    margin: 4,
    padding: 5,
    borderRadius: 2,
    textAlign: 'center',
    cursor: 'pointer',
    ':active': {
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    },
  },
  selectedColor: {
    backgroundColor: '#fcffbd',
  },
  matchedColor: {
    backgroundColor: '#9ff5a9',
    boxShadow: '',
  },
  missedColor: {
    backgroundColor: '#ff9684',
    boxShadow: '',
  },
  matchedAnimation: {
    boxShadow: '',
    animationName: matchedKeyframes,
    animationDuration: '400ms',
    animationIterationCount: 1,
    animationTimingFunction: 'linear',
    animationFillMode: 'forwards',
  },
  missedAnimation: {
    animationName: missedKeyframes,
    animationDuration: '400ms',
    animationIterationCount: 1,
    animationTimingFunction: 'linear',
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
