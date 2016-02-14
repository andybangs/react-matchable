import { call, put } from 'redux-saga';
import { PLAYING, END } from '../constants/gameStates';
import { tickTimer, setState } from '../actions/quiz';

// wait :: Number -> Promise
const wait = ms => (
  new Promise(resolve => {
    setTimeout(() => resolve(), ms);
  })
);

export default function* timer(getState) {
  while (getState().quiz.gameState !== PLAYING) {
    while (true) {
      yield call(wait, 1000);

      if (getState().quiz.gameState === PLAYING) {
        if (getState().quiz.timerSeconds > 0) {
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
