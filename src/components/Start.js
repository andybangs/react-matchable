import React, { PropTypes } from 'react';
import Button from './Button';
import { PLAYING } from '../constants/gameStates';

const Start = (props) => {
  const { title, description, setGameState } = props;

  function play() {
    setGameState(PLAYING);
  }

  return (
    <div style={styles.container}>

      <div style={styles.header}>
        <span style={styles.title}>{title}</span>
        <span style={styles.description}>{description}</span>
      </div>

      <div style={styles.body}>
        <Button clickHandler={play}>Play</Button>
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
  title: {
    margin: '0 0 5px 0',
    fontSize: '2em',
    fontWeight: '700',
  },
  description: {
    fontSize: '1.1em',
  },
};

Start.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  setGameState: PropTypes.func.isRequired,
};

export default Start;
