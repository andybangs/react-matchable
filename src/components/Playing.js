import React, { PropTypes } from 'react';
import cL from 'classnames';
import Tile from './Tile';
import { PAUSED } from '../constants/gameStates';

const Playing = (props) => {
  const { data, guessesRemaining, correct, wrong, setGameState, selectItem } = props;

  function pause() {
    setGameState(PAUSED);
  }

  function select(i) {
    selectItem(i.mid, i.id);
  }

  // buildItem : Item -> Bool -> Func -> JSX
  function buildItem(item, isMatched, handleItemClick) {
    function handleClick() {
      handleItemClick(item);
    }

    return (
      <li key={`${item.mid}-${item.id}`}
        onClick={handleClick}
        className={cL('li', { 'selected': item.selected }, { 'matched': isMatched }) }
      >{item.value}</li>
  );
  }

  // buildColumn : Array Matchable -> JSX
  function buildColumn(dataArr, id) {
    const items = dataArr.map(m => [m.matched, m.items])
      .map(arr => [arr[0], arr[1].filter(i => i.id === id)])
      .map(arr => buildItem(arr[1][0], arr[0], select));

    return <ul style={styles.ul}>{items}</ul>;
  }

  const leftColumn = buildColumn(data, 0);
  const rightColumn = buildColumn(data, 1);

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
    justifyContent: 'space-around',
  },
  ul: {
    paddingLeft: 0,
    listStyle: 'none',
    borderRadius: '4px',
    border: 'solid 1px',
    display: 'flex',
    flexFlow: 'column',
    justifyContent: 'space-around',
  },
};

Playing.propTypes = {
  data: PropTypes.array.isRequired,
  guessesRemaining: PropTypes.number.isRequired,
  correct: PropTypes.number.isRequired,
  wrong: PropTypes.number.isRequired,
  setGameState: PropTypes.func.isRequired,
  selectItem: PropTypes.func.isRequired,
};

export default Playing;
