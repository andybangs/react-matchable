import fetch from 'isomorphic-fetch';
import { put, call } from 'redux-saga/effects';
import { requestQuiz, receiveQuiz, setState, tickTimer } from '../actions';
import { PLAYING, END } from '../constants/gameStates';
import demoQuiz from './demoQuiz';

// fetchQuizApi :: QuizState
function fetchQuizApi() {
  // TODO: Replace mock API
  return fetch('http://localhost:5555/0')
    .then(res => {
      if (!res.ok) throw Error(res.statusText);
      return res.json();
    })
    .catch(err => {
      console.error(err);
      console.log('Demo quiz returned from failed fetchQuizApi call');
      return demoQuiz;
    });
}

// wait :: Number -> Promise
function wait(ms) {
  return new Promise(resolve => {
    setTimeout(() => resolve(), ms);
  });
}

function* fetchQuiz() {
  yield put(requestQuiz());
  const quiz = yield call(fetchQuizApi);
  yield put(receiveQuiz(quiz));
}

function* runTimer(getState) {
  while (getState().quiz.data.gameState !== PLAYING) {
    while (true) {
      yield call(wait, 1000);

      if (getState().quiz.data.gameState === PLAYING) {
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

export default [fetchQuiz, runTimer];
