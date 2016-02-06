import { START } from '../constants/gameStates';
import { SET_GAME_STATE, RESET } from '../constants/quiz';

const initialState = {
  title: 'Author Quiz',
  description: 'Match the title to the author',
  guessesRemaining: 7,
  correct: 0,
  wrong: 0,
  gameState: START,
};

export default function quiz(state = initialState, action) {
  switch (action.type) {
    case SET_GAME_STATE:
      return {
        ...state,
        gameState: action.gameState,
      };

    case RESET:
      return initialState;

    default:
      return state;
  }
}
