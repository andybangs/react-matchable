import React, { PropTypes } from 'react';
import Radium from 'radium';
import Tile from './Tile';
import { RESET } from '../constants/quiz';
import formatTime from '../util/formatTime';

const End = (props) => {
  const {
    itemIds,
    columns,
    correct,
    timerSeconds,
    quizLength,
    reset,
  } = props;

  function retry() {
    reset(RESET);
  }

  // calcScore :: Number -> Number -> String
  function calcScore(numCorrect, numTotal) {
    return `${Math.round(Math.round((numCorrect / numTotal) * 1000) / 10)}%`;
  }

  // buildItem :: Item -> Bool -> JSX
  function buildItem(item, isMatched) {
    const result = isMatched ? 'matched' : 'missed';
    return (
      <li key={`${item.mid}-${item.id}`}
        style={[
          styles.li,
          styles[result],
        ]}
      >{item.value}</li>
    );
  }

  // buildColumn :: Array Matchable -> Number -> JSX
  function buildColumn(columnArr, columnKey) {
    const items = columnArr.map(m => buildItem(m.items[0], m.matched));

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
        <button onClick={retry}>Try Again</button>
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
    fontSize: '0.7em',
    cursor: 'pointer',
  },
  matched: {
    backgroundColor: '#9ff5a9',
  },
  missed: {
    backgroundColor: '#f58471',
  },
};

End.propTypes = {
  itemIds: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  correct: PropTypes.number.isRequired,
  timerSeconds: PropTypes.number.isRequired,
  quizLength: PropTypes.number.isRequired,
  reset: PropTypes.func.isRequired,
};

export default Radium(End);
