import { SET_GAME_STATE, TICK, RESET, SELECT_ITEM, TOGGLE_FOCUS } from '../constants/quiz';

export function setGameState(state) {
  return {
    type: SET_GAME_STATE,
    gameState: state,
  };
}

export function tick() {
  return {
    type: TICK,
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

export function reset() {
  return {
    type: RESET,
  };
}
