import { flatMap } from 'lodash';
import { START, END } from '../constants/gameStates';
import { SET_GAME_STATE, RESET, SELECT_ITEM } from '../constants/quiz';

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
  matchable(0, [item(0, 0, 'The Great Gatsby'), item(0, 1, 'F. Scott Fitzgerald')]),
  matchable(1, [item(1, 0, '1984'), item(1, 1, 'George Orwell')]),
  matchable(2, [item(2, 0, 'Sense and Sensibility'), item(2, 1, 'Jane Austen')]),
  matchable(3, [item(3, 0, 'Lord of the Flies'), item(3, 1, 'William Golding')]),
  matchable(4, [item(4, 0, 'Anna Karenina'), item(4, 1, 'Leo Tolstoy')]),
];

const initialState = {
  title: 'Author Quiz',
  description: 'Match the title to the author',
  data: initialData,
  guessesRemaining: 5,
  correct: 0,
  wrong: 0,
  gameState: START,
};

// selected : Array Matchable -> Array [Number, Number]
function selected(data) {
  return flatMap(data, m => m.items)
    .filter(i => i.selected)
    .map(i => [i.mid, i.id]);
}

// deselectItems : Array Item -> Array Item
function deselectItems(items) {
  return items.map(i => ({ ...i, selected: false }));
}

export default function quiz(state = initialState, action) {
  switch (action.type) {
    case SET_GAME_STATE:
      return {
        ...state,
        gameState: action.gameState,
      };

    case RESET:
      return initialState;

    case SELECT_ITEM:
      // If the item's matchable is already matched, take no action and return state
      if (state.data[action.mid].matched) return state;

      // newData : Array Matchable
      const newData = state.data.map(m => {
        if (m.id === action.mid) {
          // Toggle selected property of the item
          const newItems = m.items.map(i => i.id === action.id ?
            { ...i, selected: !i.selected } :
            i
          );
          return { ...m, items: newItems };
        }
        return m;
      });

      // selectedItems : Array [mid, id]
      const selectedItems = selected(newData);

      // If 0 or 1 items are currently selected, return state with the toggled item
      if (selectedItems.length === 0 || selectedItems.length === 1) {
        return { ...state, data: newData };
      }

      // If the previously selected item is from the same column (it has the same id)...
      if (selectedItems[0][1] === selectedItems[1][1]) {
        // selectedStr : Array String
        const selectedStr = selectedItems.map(arr => arr.toString());

        // newData2 : Array Matchable
        const newData2 = newData.map(m => {
          // ...check to make sure it's not the most recently selected item,
          // and that it's included in the array of selected items...
          if (m.id !== action.mid && selectedStr.includes([m.id, action.id].toString())) {
            // ...deselect it...
            return { ...m, items: deselectItems(m.items) };
          }
          return m;
        });

        // ...and return state with only the most recently toggled item selected
        return { ...state, data: newData2 };
      }

      // Initialize variable for new state to be returned
      let newState;

      // If the previously selected item creates a match (it has the same mid)...
      if (selectedItems[0][0] === selectedItems[1][0]) {
        const newData3 = newData.map(m => {
          if (m.id === action.mid) {
            // ...deselect both items and set matched property to true
            return {
              ...m,
              items: deselectItems(m.items),
              matched: true,
            };
          }
          return m;
        });

        // Assign newState object to variable declared above
        newState = {
          ...state,
          data: newData3,
          guessesRemaining: state.guessesRemaining - 1,
          correct: state.correct + 1,
        };
      }

      // If the previously selected item doesn't create a match (it has a different mid)...
      if (selectedItems[0][0] !== selectedItems[1][0]) {
        const newData4 = newData.map(m => {
          // ...deselect both items
          if (m.id === selectedItems[0][0] || m.id === selectedItems[1][0]) {
            return { ...m, items: deselectItems(m.items) };
          }
          return m;
        });

        // Assign newState object to variable declared above
        newState = {
          ...state,
          data: newData4,
          guessesRemaining: state.guessesRemaining - 1,
          wrong: state.wrong + 1,
        };
      }

      // If no guesses remain, end the game
      if (newState.guessesRemaining === 0) newState = { ...newState, gameState: END };

      return newState;

    default:
      return state;
  }
}
