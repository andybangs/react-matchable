import React, { PropTypes } from 'react';
import { PLAYING } from '../constants/gameStates';

const Start = (props) => {
  const { title, description, setGameState } = props;

  function play() {
    setGameState(PLAYING);
  }

  return (
    <div style={styles.container}>

      <div style={styles.top}>
        <h2>{title}</h2>
        <h3>{description}</h3>
      </div>

      <div style={styles.bottom}>
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
  top: {
    height: '50%',
    display: 'flex',
    flexFlow: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottom: {
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
