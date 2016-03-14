import React, { PropTypes } from 'react';
import Radium from 'radium';

const Button = ({ clickHandler, children }) =>
  <button
    style={[styles.button]}
    onClick={clickHandler}
  >
    {children}
  </button>;

const styles = {
  button: {
    border: 0,
    borderRadius: 1,
    padding: 7,
    minWidth: 100,
    color: '#ebf0f4',
    backgroundColor: '#7bbdcf',
    transition: 'all 0.2s ease',
    ':hover': {
      backgroundColor: '#74b1c1',
    },
  },
};

Button.propTypes = {
  clickHandler: PropTypes.func.isRequired,
  children: PropTypes.string.isRequired,
};

export default Radium(Button);
