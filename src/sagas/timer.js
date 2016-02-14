import { call, put } from 'redux-saga';
import { STOPPED, RUNNING } from '../constants/timerStates';
import { tickTimer } from '../actions/quiz';

// wait :: Number -> Promise
const wait = ms => (
  new Promise(resolve => {
    setTimeout(() => resolve(), ms);
  })
);

export default function* timer(getState) {
  while (getState().quiz.timerState === STOPPED) {
    while (true) {
      // This side effect is not run yet, so it can be treated
      // as data, making it easier to test if needed.
      yield call(wait, 1000);

      // If the timer is still running, dispatch a TICK_TIMER.
      if (getState().quiz.timerState === RUNNING) {
        yield put(tickTimer());
        // Otherwise, go idle until user starts the timer again.
      } else {
        break;
      }
    }
  }
}
