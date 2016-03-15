import React, { PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { END } from '../constants/gameStates';
import Button from './Button';

const PausedBody = (props) => {
  const { setState } = props;

  function quit() {
    setState(END);
  }

  return (
    <ReactCSSTransitionGroup
      transitionName="initial"
      transitionAppear={true}
      transitionAppearTimeout={500}
    >
      <div style={styles.container}>
        <span style={styles.message}>Phew! Take a breath.</span>
        <Button clickHandler={quit}>I'm over it!</Button>
      </div>
    </ReactCSSTransitionGroup>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexFlow: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  message: {
    margin: '25px 0 25px 0',
    fontWeight: '700',
  },
};

PausedBody.propTypes = {
  setState: PropTypes.func.isRequired,
};

export default PausedBody;
