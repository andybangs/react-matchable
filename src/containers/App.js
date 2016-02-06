import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as CounterActions from '../actions/counter';
import Header from '../components/Header';
import Counter from '../components/Counter';

const App = (props) => {
  const { counter, actions } = props;

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <Header title="Matchable Quiz" />
      </div>
      <div style={styles.body}>
        <Counter
          count={counter.count}
          inc={actions.inc}
          dec={actions.dec}
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
    color: '#665e5e',
  },
  header: {
    height: '15%',
    backgroundColor: '#ebf0f4',
  },
  body: {
    height: '85%',
    backgroundColor: '#d9d9d9',
  },
};

App.propTypes = {
  counter: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    counter: state.counter,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(CounterActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
