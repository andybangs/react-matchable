import { SET_STATE, SELECT_ITEM, TOGGLE_FOCUS, RESET_STATE } from '../constants/quiz';

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
