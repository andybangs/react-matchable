import {
  REQUEST_QUIZ,
  RECEIVE_QUIZ,
  RESET_STATE,
  TICK_TIMER,
} from '../constants';

const initialState = {
  seconds: 0,
  cachedSeconds: 0,
  isFetching: false,
};

export default function timer(state = initialState, action) {
  switch (action.type) {
    case REQUEST_QUIZ:
      return { ...state, isFetching: true };

    case RECEIVE_QUIZ:
      return {
        ...state,
        seconds: action.data.timerSeconds,
        cachedSeconds: action.data.timerSeconds,
        isFetching: false,
      };

    case TICK_TIMER:
      return { ...state, seconds: state.seconds - 1 };

    case RESET_STATE:
      return { ...state, seconds: state.cachedSeconds };

    default:
      return state;
  }
}
