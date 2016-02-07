import React, { PropTypes } from 'react';
import { shuffle, flatMap } from 'lodash';
import Tile from './Tile';
import { PAUSED } from '../constants/gameStates';

const Playing = (props) => {
  const { data, guessesRemaining, correct, wrong, setGameState } = props;

  function pause() {
    setGameState(PAUSED);
  }

  function buildColumn(arr, id) {
    const items = shuffle(
      flatMap(arr, m => m.items)
        .filter(i => i.id === id)
        .map(i => <li key={i.mid} style={styles.li}>{i.value}</li>)
    );

    return (
      <ul style={styles.ul}>{items}</ul>
    );
  }

  const leftColumn = buildColumn(data, 1);
  const rightColumn = buildColumn(data, 2);

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
    padding: '2%',
    borderRadius: '4px',
    border: 'solid 1px',
    display: 'flex',
    flexFlow: 'column',
    justifyContent: 'space-around',
  },
  li: {
    backgroundColor: '#fff',
    padding: '5px',
    borderRadius: '4px',
    textAlign: 'center',
    fontSize: '0.8em',
    cursor: 'pointer',
  },
};

Playing.propTypes = {
  data: PropTypes.array.isRequired,
  guessesRemaining: PropTypes.number.isRequired,
  correct: PropTypes.number.isRequired,
  wrong: PropTypes.number.isRequired,
  setGameState: PropTypes.func.isRequired,
};

export default Playing;
