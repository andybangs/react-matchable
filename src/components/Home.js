import React, { Component } from 'react';
import { Link } from 'react-router';
import AppHeader from './AppHeader';

class Start extends Component {
  render() {
    return (
      <div style={styles.container}>
        <div style={styles.header}>
          <AppHeader title="React Matchable" />
        </div>
        <div style={styles.body}>
          <p>A quiz app inspired by the Matchable Quiz format by Sporcle.</p>
          <h2>Demos</h2>
          <ul style={styles.ul}>
            <li><Link to="/quiz/0" style={styles.link}>Classic Authors</Link></li>
            <li><Link to="/quiz/1" style={styles.link}>TV Show Characters</Link></li>
            <li><Link to="/quiz/2" style={styles.link}>State Capitals</Link></li>
          </ul>
        </div>
      </div>
    );
  }
}

const styles = {
  container: {
    display: 'flex',
    flexFlow: 'column',
    alignItems: 'stretch',
    backgroundColor: '#ebf0f4',
    color: '#665e5e',
  },
  header: {
    height: '10%',
  },
  body: {
    height: '90%',
    display: 'flex',
    flexFlow: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  ul: {
    paddingLeft: 0,
    listStyle: 'none',
    display: 'flex',
    flexFlow: 'column',
    alignItems: 'center',
  },
  link: {
    textDecoration: 'none',
    color: '#7bbdcf',
    fontWeight: '700',
  },
};

export default Start;
