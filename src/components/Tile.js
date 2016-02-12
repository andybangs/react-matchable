import React, { PropTypes } from 'react';

const Tile = (props) => {
  const { header, value } = props;

  return (
    <div style={styles.container}>
      <span style={styles.header}>{header}</span>
      <span style={styles.body}>{value}</span>
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
  header: {
    fontSize: '0.8em',
  },
  body: {
    fontSize: '1.5em',
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
