import React, { PropTypes } from 'react';
import Radium from 'radium';
import Tile from './Tile';
import formatTime from '../util/formatTime';

const End = (props) => {
  const {
    itemIds,
    columns,
    correct,
    timerSeconds,
    quizLength,
    toggleFocus,
    reset,
  } = props;

  // calcScore :: Number -> Number -> String
  function calcScore(numCorrect, numTotal) {
    return `${Math.round(Math.round((numCorrect / numTotal) * 1000) / 10)}%`;
  }

  // buildItem :: Item -> Bool -> Bool -> JSX
  function buildItem(item, isMatched, isFocused) {
    const result = isMatched ? 'matched' : 'missed';
    const focused = isFocused ? 'focused' : '';

    function handleOnMouseOver() {
      toggleFocus(item.mid);
    }

    function handleOnMouseLeave() {
      toggleFocus(null);
    }

    return (
      <li key={`${item.mid}-${item.id}`}
        onMouseEnter={handleOnMouseOver}
        onMouseLeave={handleOnMouseLeave}
        style={[
          styles.li,
          styles[result],
          styles[focused],
        ]}
      >{item.value}</li>
    );
  }

  // buildColumn :: Array Matchable -> Number -> JSX
  function buildColumn(columnArr, columnKey) {
    const items = columnArr.map(m => buildItem(m.items[0], m.matched, m.items[0].focused));

    return <ul key={columnKey} style={styles.ul}>{items}</ul>;
  }

  // columns :: Array JSX
  const columnsArr = itemIds.map(id => buildColumn(columns[id], id));

  return (
    <div style={styles.container}>

      <div style={styles.top}>
        <Tile header="You got" value={calcScore(correct, quizLength)} />
        <Tile header="Score" value={`${correct}/${quizLength}`} />
        <Tile header="Timer" value={formatTime(timerSeconds)} />
        <button onClick={reset}>Try Again</button>
      </div>

      <div style={styles.bottom}>
        {columnsArr}
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
  matched: {
    backgroundColor: '#9ff5a9',
  },
  missed: {
    backgroundColor: '#f58471',
  },
  focused: {
    backgroundColor: '#fcffbd',
  },
};

End.propTypes = {
  itemIds: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  correct: PropTypes.number.isRequired,
  timerSeconds: PropTypes.number.isRequired,
  quizLength: PropTypes.number.isRequired,
  toggleFocus: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
};

export default Radium(End);
