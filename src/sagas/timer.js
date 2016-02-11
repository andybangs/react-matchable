// http://jaysoo.ca/2016/01/03/managing-processes-in-redux-using-sagas/

import { call, put } from 'redux-saga';
import { STOPPED, RUNNING } from '../constants/timerStates';
import { tick } from '../actions/quiz';

// wait :: Number -> Promise
const wait = ms => (
  new Promise(resolve => {
    setTimeout(() => resolve(), ms);
  })
);

export default function* runTimer(getState) {
  while (getState().quiz.timerState === STOPPED) {
    while (true) {
      // This side effect is not run yet, so it can be treated
      // as data, making it easier to test if needed.
      yield call(wait, 1000);

      // Check if the timer is still running.
      // If so, then dispatch a TICK.
      if (getState().quiz.timerState === RUNNING) {
        yield put(tick());
        // Otherwise, go idle until user starts the timer again.
      } else {
        break;
      }
    }
  }
}
