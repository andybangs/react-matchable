import { INC, DEC } from '../constants/counter';

const initialState = {
  count: 0,
};

export default function counter(state = initialState, action) {
  switch (action.type) {
    case INC:
      return {
        ...state,
        count: state.count + 1,
      };

    case DEC:
      return {
        ...state,
        count: state.count - 1,
      };

    default:
      return state;
  }
}
