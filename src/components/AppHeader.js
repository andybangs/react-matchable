import React, { PropTypes } from 'react';

const AppHeader = ({ title }) =>
  <div style={styles.container}>
    <h2>{title}</h2>
  </div>;

const styles = {
  container: {
    display: 'flex',
    flexFlow: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
};

AppHeader.propTypes = {
  title: PropTypes.string.isRequired,
};

export default AppHeader;
