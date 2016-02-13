import React, { PropTypes } from 'react';
import formatTime from '../util/formatTime';
import Tile from './Tile';

const Timer = ({ timerSeconds }) => <Tile header="Timer" value={formatTime(timerSeconds)} />;

Timer.propTypes = {
  timerSeconds: PropTypes.number.isRequired,
};

export default Timer;
