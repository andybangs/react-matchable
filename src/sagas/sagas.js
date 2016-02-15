import { call, put } from 'redux-saga';
import { PLAYING, END } from '../constants/gameStates';
import { setState } from '../actions/quiz';
import { tickTimer } from '../actions/timer';

// wait :: Number -> Promise
const wait = ms => (
  new Promise(resolve => {
    setTimeout(() => resolve(), ms);
  })
);

function* runTimer(getState) {
  while (getState().quiz.gameState !== PLAYING) {
    while (true) {
      yield call(wait, 1000);

      if (getState().quiz.gameState === PLAYING) {
        if (getState().timer.seconds > 0) {
          yield put(tickTimer());
        } else {
          yield put(setState(END));
        }
      } else {
        break;
      }
    }
  }
}

export default [runTimer];
