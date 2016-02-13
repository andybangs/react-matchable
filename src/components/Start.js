import React, { PropTypes } from 'react';
import { PLAYING } from '../constants/gameStates';
import Button from './Button';

const Start = (props) => {
  const { title, description, setState } = props;

  function play() {
    setState(PLAYING);
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
  setState: PropTypes.func.isRequired,
};

export default Start;
