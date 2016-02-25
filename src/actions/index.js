import {
  REQUEST_QUIZ,
  RECEIVE_QUIZ,
  SET_STATE,
  SELECT_ITEM,
  TOGGLE_FOCUS,
  RESET_STATE,
  TICK_TIMER,
} from '../constants';

export function requestQuiz() {
  return {
    type: REQUEST_QUIZ,
  };
}

export function receiveQuiz(data) {
  return {
    type: RECEIVE_QUIZ,
    data,
  };
}

export function setState(state) {
  return {
    type: SET_STATE,
    gameState: state,
  };
}

export function selectItem(mid, id) {
  return {
    type: SELECT_ITEM,
    mid,
    id,
  };
}

export function toggleFocus(mid) {
  return {
    type: TOGGLE_FOCUS,
    mid,
  };
}

export function resetState() {
  return {
    type: RESET_STATE,
  };
}

export function tickTimer() {
  return {
    type: TICK_TIMER,
  };
}
