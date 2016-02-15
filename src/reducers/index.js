import { combineReducers } from 'redux';
import quiz from './quiz';
import timer from './timer';

const rootReducer = combineReducers({
  quiz,
  timer,
});

export default rootReducer;
