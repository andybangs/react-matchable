import React, { Component } from 'react';
import AppHeader from './AppHeader';
import Panel from './Panel';

const authorQuiz = {
  index: 0,
  title: 'Classic Authors',
  featureTitle: 'Sudden Death',
  featureDescription: 'Be careful! Miss one and the game is over.',
};

const tvQuiz = {
  index: 1,
  title: 'TV Show Characters',
  featureTitle: 'Multi Column',
  featureDescription: 'Bored of 2 column quizzes? This one\'s for you.',
};

const stateQuiz = {
  index: 2,
  title: 'State Capitals',
  featureTitle: 'Alphabetical Sort',
  featureDescription: 'Want your columns sorted alphabetically? No problem!',
};

class Start extends Component {
  render() {
    return (
      <div style={styles.container}>
        <div style={styles.header}>
          <AppHeader title="React Matchable" />
        </div>
        <div style={styles.body}>
          <div style={styles.description}>
            <p>A quiz app inspired by the Matchable Quiz format by Sporcle.</p>
            <h2>Demos</h2>
          </div>
          <div style={styles.panels}>
            <Panel config={authorQuiz} />
            <Panel config={tvQuiz} />
            <Panel config={stateQuiz} />
          </div>
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
  },
  description: {
    height: '25%',
    display: 'flex',
    flexFlow: 'column',
    alignItems: 'center',
  },
  panels: {
    height: '75%',
    display: 'flex',
    alignItems: 'space-around',
    justifyContent: 'space-around',
  },
};

export default Start;
