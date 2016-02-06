import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as QuizActions from '../actions/quiz';
import Header from '../components/Header';
import Quiz from '../components/Quiz';

const App = (props) => {
  const { quiz, actions } = props;

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <Header title="Matchable Quiz" />
      </div>
      <div style={styles.body}>
        <Quiz
          quiz={quiz}
          setGameState={actions.setGameState}
          reset={actions.reset}
        />
      </div>
    </div>
  );
};

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
};

App.propTypes = {
  quiz: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    quiz: state.quiz,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(QuizActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
