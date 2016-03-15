import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../actions';
import AppHeader from '../components/AppHeader';
import AppRouter from '../components/AppRouter';

class App extends Component {
  componentWillMount() {
    const { actions, routeParams } = this.props;
    console.log(this.props);
    actions.fetchQuiz(routeParams.id);
  }

  componentWillReceiveProps(nextProps) {
    const { actions, routeParams } = this.props;
    if (nextProps.routeParams.id !== routeParams.id) {
      actions.fetchQuiz(routeParams.id);
    }
  }

  componentWillUnmount() {
    this.props.actions.resetState();
  }

  render() {
    const { quiz, timer, actions } = this.props;
    return (
      <div style={styles.container}>
        <div style={styles.header}>
          <AppHeader title="React Matchable" />
        </div>
        <div style={styles.body}>
          <AppRouter quiz={quiz} timer={timer} actions={actions} />
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
    height: '12%',
  },
  body: {
    height: '88%',
  },
};

App.propTypes = {
  quiz: PropTypes.object.isRequired,
  timer: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  routeParams: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    quiz: state.quiz,
    timer: state.timer,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
