import React, { PropTypes } from 'react';
import { PLAYING } from '../constants/gameStates';

const Start = (props) => {
  const { title, description, setGameState } = props;

  function play() {
    setGameState(PLAYING);
  }

  return (
    <div style={styles.container}>

      <div style={styles.header}>
        <h2>{title}</h2>
        <h3>{description}</h3>
      </div>

      <div style={styles.body}>
        <button onClick={play}>Play</button>
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
    height: '50%',
    display: 'flex',
    flexFlow: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: {
    height: '50%',
    display: 'flex',
    flexFlow: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
};

Start.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  setGameState: PropTypes.func.isRequired,
};

export default Start;
