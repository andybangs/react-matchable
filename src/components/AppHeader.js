import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const AppHeader = ({ title }) =>
  <div style={styles.container}>
    <h1><Link to="/" style={styles.link}>{title}</Link></h1>
  </div>;

const styles = {
  container: {
    display: 'flex',
    flexFlow: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  link: {
    textDecoration: 'none',
    color: '#665e5e',
  },
};

AppHeader.propTypes = {
  title: PropTypes.string.isRequired,
};

export default AppHeader;
