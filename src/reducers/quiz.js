import { flatMap, flatten, shuffle, take, uniq } from 'lodash';
import { START, PLAYING, END } from '../constants/gameStates';
import { STOPPED, RUNNING } from '../constants/timerStates';
import { SET_GAME_STATE, TICK, SELECT_ITEM, TOGGLE_FOCUS, RESET } from '../constants/quiz';

/* -- TYPE ALIASES ---------------------------------------------------------------------------------
type alias Item = {
  mid :: Number,
  id :: Number,
  value :: String,
  selected :: Bool,
  focused :: Bool,
}

type alias Matchable = {
  id :: Number,
  items :: Array Item,
  matched :: Bool,
}
------------------------------------------------------------------------------------------------- */

// item :: Number -> Number -> String -> Item
function item(mid, id, value) {
  return {
    mid,
    id,
    value,
    selected: false,
    focused: false,
  };
}

// matchable :: Number -> Array Item -> Matchable
function matchable(id, items) {
  return {
    id,
    items,
    matched: false,
  };
}

const testQuiz = [
  matchable(0, [item(0, 0, 'Pride and Prejudice'), item(0, 1, 'Jane Austen')]),
  matchable(1, [item(1, 0, '1984'), item(1, 1, 'George Orwell')]),
  matchable(2, [item(2, 0, 'The Great Gatsby'), item(2, 1, 'F. Scott Fitzgerald')]),
  matchable(3, [item(3, 0, 'Jane Eyre'), item(3, 1, 'Charlotte Brontë')]),
  matchable(4, [item(4, 0, 'Crime and Punishment'), item(4, 1, 'Fyodor Dostoyevsky')]),
  matchable(5, [item(5, 0, 'Wuthering Heights'), item(5, 1, 'Emily Brontë')]),
  matchable(6, [item(6, 0, 'Lolita'), item(6, 1, 'Vladimir Nabokov')]),
  matchable(7, [item(7, 0, 'The Adventures of Huckleberry Finn'), item(7, 1, 'Mark Twain')]),
  matchable(8, [item(8, 0, 'Of Mice and Men'), item(8, 1, 'John Steinbeck')]),
  matchable(9, [item(9, 0, 'The Count of Monte Cristo'), item(9, 1, 'Alexandre Dumas')]),
  matchable(10, [item(10, 0, 'Brave New World'), item(10, 1, 'Aldous Huxley')]),
  matchable(11, [item(11, 0, 'One Hundred Years of Solitude'), item(11, 1, 'Gabriel Garcí­a Márquez')]),
];

// const testQuiz = [
//   matchable(0, [item(0, 0, 'Daenerys Targaryen'), item(0, 1, 'Jon Snow'), item(0, 2, 'Tyrion Lannister')]),
//   matchable(1, [item(1, 0, 'Rory Gilmore'), item(1, 1, 'Lane Kim'), item(1, 2, 'Paris Geller')]),
//   matchable(2, [item(2, 0, 'Don Draper'), item(2, 1, 'Peggy Olson'), item(2, 2, 'Roger Sterling')]),
//   matchable(3, [item(3, 0, 'Rick Grimes'), item(3, 1, 'Daryl Dixon'), item(3, 2, 'Maggie Greene')]),
//   matchable(4, [item(4, 0, 'Kara Thrace'), item(4, 1, 'Gaius Baltar'), item(4, 2, 'Laura Roslin')]),
//   matchable(5, [item(5, 0, 'Jack Shephard'), item(5, 1, 'Kate Austen'), item(5, 2, 'Ben Linus')]),
//   matchable(6, [item(6, 0, 'Michael Bluth'), item(6, 1, 'Tobias Fünke'), item(6, 2, 'Steve Holt')]),
// ];

// parseItemIds :: Array Matchable -> Array Number
function parseItemIds(quizData) {
  return flatten(take(quizData).map(m => m.items)).map(i => i.id);
}

// parseColumns :: Array Matchable -> Array Number -> Array (Array Matchable)
function parseColumns(quizData, itemIds) {
  return itemIds.map(id =>
    shuffle(quizData)
      .map(m => ({ ...m, items: m.items.filter(i => i.id === id) }))
  );
}

const itemIdArr = parseItemIds(testQuiz);
const columnsArr = parseColumns(testQuiz, itemIdArr);
const numGuesses = flatten(take(columnsArr)).length;

const initialState = {
  title: 'Famous Literary Novels',
  description: 'Match the title to the author',
  // title: 'TV Characters',
  // description: 'Click corresponding answers to create a match',
  itemIds: itemIdArr,
  columns: columnsArr,
  guessesRemaining: numGuesses,
  correct: 0,
  wrong: 0,
  attempted: [],
  gameState: START,
  timerState: STOPPED,
  timerSeconds: 90,
};

// selected :: Array (Array Matchable) -> Array [Number, Number]
function selected(columns) {
  return flatten(columns.map(column =>
    flatMap(column, m => m.items)
      .filter(i => i.selected)
      .map(i => [i.mid, i.id])
  ));
}

export default function quiz(state = initialState, action) {
  switch (action.type) {
    case SET_GAME_STATE:
      return action.gameState === PLAYING ?
        { ...state, gameState: action.gameState, timerState: RUNNING } :
        { ...state, gameState: action.gameState, timerState: STOPPED };

    case TICK:
      return state.timerSeconds > 0 ?
        { ...state, timerSeconds: state.timerSeconds - 1 } :
        { ...state, gameState: END };

    case SELECT_ITEM:
      // alreadyMatched :: Bool
      const alreadyMatched = flatten(take(state.columns))
        .filter(m => m.id === action.mid && m.matched)
        .length === 1;

      // If the item's matchable is already matched, take no action and return state
      if (alreadyMatched) return state;

      // newColumns :: Array (Array Matchable)
      const newColumns = state.columns
        .map(column => column.map(m => {
          if (m.id === action.mid) {
            // Toggle selected property of the item
            const newItems = m.items.map(i => i.id === action.id ?
              { ...i, selected: !i.selected } :
              i
            );
            return { ...m, items: newItems };
          }
          return m;
        }));

      // selectedItems :: Array [mid, id]
      const selectedItems = selected(newColumns);

      // selectedIds :: Array Number
      const selectedIds = selectedItems.map(arr => arr[1]);

      // sameColumn :: Bool
      const sameColumn = uniq(selectedIds).length < selectedIds.length;

      // If there are fewer selected items than there are number of columns, and if
      // the selected items are not from the same column, return state with the toggled item(s)
      if (selectedItems.length < state.itemIds.length && !sameColumn) {
        return { ...state, columns: newColumns, attempted: [] };
      }

      // If previously selected item(s) are from the same column (have the same id)...
      if (sameColumn) {
        // newColumns2 :: Array (Array Matchable)
        const newColumns2 = newColumns
          .map(column =>
            column.map(m =>
              ({
                ...m,
                items: m.items.map(i => {
                  if ([i.mid, i.id].toString() !== [action.mid, action.id].toString()) {
                    if (i.id === action.id) return { ...i, selected: false };
                  }
                  return i;
                }),
              })
            )
          );

        // ...return state with only the most recently toggled item selected
        return { ...state, columns: newColumns2, attempted: [] };
      }

      // selectedMids :: Array Number
      const selectedMids = selectedItems.map(arr => arr[0]);

      // isMatch :: Bool
      const isMatch = uniq(selectedMids).length === 1;

      // Initialize variable for new state to be returned
      let newState;

      // If the previously selected item(s) create a match (have the same mid)...
      if (isMatch) {
        const newColumns3 = newColumns
          .map(column => column.map(m => {
            // ...deselect all items and set matched property to true
            if (m.id === action.mid) {
              return {
                ...m,
                items: m.items.map(i => ({ ...i, selected: false })),
                matched: true,
              };
            }
            return m;
          }));

        // Assign newState object to variable declared above
        newState = {
          ...state,
          columns: newColumns3,
          guessesRemaining: state.guessesRemaining - 1,
          correct: state.correct + 1,
          attempted: [],
        };
      }

      // If the previously selected item doesn't create a match (it has a different mid)...
      if (!isMatch) {
        const newColumns4 = newColumns
          .map(column => column.map(m => {
            // ...deselect all items
            if (selectedMids.includes(m.id)) {
              return {
                ...m,
                items: m.items.map(i => ({ ...i, selected: false })),
              };
            }
            return m;
          }));

        // Assign newState object to variable declared above
        newState = {
          ...state,
          columns: newColumns4,
          guessesRemaining: state.guessesRemaining - 1,
          wrong: state.wrong + 1,
          attempted: selectedItems,
        };
      }

      // If no guesses remain, end the game
      if (newState.guessesRemaining === 0) {
        newState = { ...newState, gameState: END, timerState: STOPPED };
      }

      return newState;

    case TOGGLE_FOCUS:
      const toggledColumns = state.columns
        .map(column => column.map(m => {
          if (m.id === action.mid) {
            return { ...m, items: m.items.map(i => ({ ...i, focused: true })) };
          }
          return { ...m, items: m.items.map(i => ({ ...i, focused: false })) };
        })
      );

      return { ...state, columns: toggledColumns };

    case RESET:
      return initialState;

    default:
      return state;
  }
}
