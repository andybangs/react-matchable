import React, { PropTypes } from 'react';

const Tile = (props) => {
  const { header, value } = props;

  return (
    <div style={styles.container}>
      <span style={styles.top}>{header}</span>
      <span style={styles.bottom}>{value}</span>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexFlow: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  top: {
    fontSize: '0.8em',
  },
  bottom: {
    fontSize: '1.5em',
  },
};

Tile.propTypes = {
  header: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
};

export default Tile;
