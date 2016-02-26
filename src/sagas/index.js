import fetch from 'isomorphic-fetch';
import { take, fork, put, call } from 'redux-saga/effects';
import { requestQuiz, receiveQuiz, setState, tickTimer } from '../actions';
import { FETCH_QUIZ } from '../constants';
import { PLAYING, END } from '../constants/gameStates';
import demoQuiz from '../../mock_api/authorQuiz';

function fetchQuizApi(id) {
  // TODO: Replace mock API
  return fetch(`http://localhost:5555/${id}`)
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

function* fetchQuiz(id) {
  yield put(requestQuiz());
  const quiz = yield call(fetchQuizApi, id);
  yield put(receiveQuiz(quiz));
}

function* watchFetch() {
  while (true) {
    const action = yield take(FETCH_QUIZ);
    yield fork(fetchQuiz, action.id);
  }
}

// wait :: Number -> Promise
function wait(ms) {
  return new Promise(resolve => {
    setTimeout(() => resolve(), ms);
  });
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

export default [watchFetch, runTimer];
