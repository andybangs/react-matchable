import { START } from '../constants/gameStates';
import { SET_GAME_STATE, RESET } from '../constants/quiz';

function item(mid, id, value) {
  return {
    mid,
    id,
    value,
    selected: false,
  };
}

function matchable(id, items) {
  return {
    id,
    items,
    matched: false,
  };
}

const initialData = [
  matchable(1, [item(1, 1, 'The Great Gatsby'), item(1, 2, 'F. Scott Fitzgerald')]),
  matchable(2, [item(2, 1, '1984'), item(2, 2, 'George Orwell')]),
  matchable(3, [item(3, 1, 'Sense and Sensibility'), item(3, 2, 'Jane Austen')]),
  matchable(4, [item(4, 1, 'Lord of the Flies'), item(4, 2, 'William Golding')]),
  matchable(5, [item(5, 1, 'Anna Karenina'), item(5, 2, 'Leo Tolstoy')]),
];

const initialState = {
  title: 'Author Quiz',
  description: 'Match the title to the author',
  data: initialData,
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
