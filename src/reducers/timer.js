import { TICK_TIMER } from '../constants/timer';

const initialState = {
  seconds: 90,
};

export default function timer(state = initialState, action) {
  switch (action.type) {
    case TICK_TIMER:
      return { ...state, seconds: state.seconds - 1 };

    default:
      return state;
  }
}
