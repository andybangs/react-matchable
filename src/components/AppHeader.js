import React, { PropTypes } from 'react';

const AppHeader = ({ title }) =>
  <div style={styles.container}>
    <span style={styles.title}>{title}</span>
  </div>;

const styles = {
  container: {
    display: 'flex',
    flexFlow: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: '1.6em',
    fontWeight: '700',
  },
};

AppHeader.propTypes = {
  title: PropTypes.string.isRequired,
};

export default AppHeader;
