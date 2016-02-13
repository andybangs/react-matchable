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
    ':hover': {
      backgroundColor: '#f6a7e4',
    },
  },
};

Button.propTypes = {
  clickHandler: PropTypes.func.isRequired,
  children: PropTypes.string.isRequired,
};

export default Radium(Button);
