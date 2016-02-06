import { SET_GAME_STATE, RESET } from '../constants/quiz';

export function setGameState(state) {
  return {
    type: SET_GAME_STATE,
    gameState: state,
  };
}

export function reset() {
  return {
    type: RESET,
  };
}
