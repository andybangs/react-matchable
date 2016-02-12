import React, { PropTypes } from 'react';
import Tile from './Tile';
import formatTime from '../util/formatTime';

const Timer = (props) => <Tile header="Timer" value={formatTime(props.timerSeconds)} />;

Timer.propTypes = {
  timerSeconds: PropTypes.number.isRequired,
};

export default Timer;
