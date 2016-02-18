import { TICK_TIMER, RESET_STATE } from '../constants/timer';

/* -- TYPES ----------------------------------------------------------------------------------------
type alias TimerState = {
  seconds :: Number,
}

type alias Action = String
------------------------------------------------------------------------------------------------- */

// initialState :: TimerState
const initialState = {
  seconds: 90,
};

// timer :: TimerState -> Action -> TimerState
export default function timer(state = initialState, action) {
  switch (action.type) {
    case TICK_TIMER:
      return { ...state, seconds: state.seconds - 1 };

    case RESET_STATE:
      return initialState;

    default:
      return state;
  }
}
