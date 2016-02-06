import React, { PropTypes } from 'react';

const Counter = (props) => {
  const { count, inc, dec } = props;

  function handleInc() {
    inc();
  }

  function handleDec() {
    dec();
  }

  return (
    <div style={styles.container}>

      <div style={styles.top}>
        <h1 style={styles.h1}>{count}</h1>
      </div>

      <div style={styles.bottom}>
        <button style={styles.btn} onClick={handleDec}>-</button>
        <button style={styles.btn} onClick={handleInc}>+</button>
      </div>

    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexFlow: 'column',
    alignItems: 'center',
  },
  top: {
    flex: 1,
  },
  bottom: {
    flex: 1,
  },
  h1: {
    fontSize: '4em',
  },
  btn: {
    fontSize: '2em',
    padding: '5px 20px',
  },
};

Counter.propTypes = {
  count: PropTypes.number.isRequired,
  inc: PropTypes.func.isRequired,
  dec: PropTypes.func.isRequired,
};

export default Counter;
