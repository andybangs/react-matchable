import React, { PropTypes } from 'react';

const AppHeader = ({ title }) =>
  <div style={styles.container}>
    <span style={styles.header}>{title}</span>
  </div>;

const styles = {
  container: {
    display: 'flex',
    flexFlow: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: '5vh',
    fontWeight: '700',
  },
};

AppHeader.propTypes = {
  title: PropTypes.string.isRequired,
};

export default AppHeader;
