import React, { PropTypes } from 'react';

const Tile = ({ header, value }) =>
  <div style={styles.container}>
    <span style={styles.header}>{header}</span>
    <span style={styles.body}>{value}</span>
  </div>;

const styles = {
  container: {
    display: 'flex',
    flexFlow: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '10vh',
  },
  header: {
    fontSize: '3vh',
    fontWeight: 700,
  },
  body: {
    fontSize: '5vh',
  },
};

Tile.propTypes = {
  header: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
};

export default Tile;
