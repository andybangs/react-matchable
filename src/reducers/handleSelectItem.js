import { flatMap, flatten, take, uniq } from 'lodash';
import { END } from '../constants/gameStates';
import { STOPPED } from '../constants/timerStates';

// selected :: Array (Array Matchable) -> Array [Item.mid, Item.id]
function selected(columns) {
  return flatten(columns.map(column =>
    flatMap(column, m => m.items)
      .filter(i => i.selected)
      .map(i => [i.mid, i.id])
  ));
}

// toggleItem :: Item -> Item
function toggleItem(i) {
  return { ...i, selected: !i.selected };
}

// deselectItem :: Item -> Item
function deselectItem(i) {
  return { ...i, selected: false };
}

export default function handleSelectItem(state, action) {
  // alreadyMatched :: Bool
  const alreadyMatched = flatten(take(state.columns))
    .filter(m => m.id === action.mid && m.matched)
    .length === 1;

  // If the item's matchable is already matched, return state
  if (alreadyMatched) return state;

  // newColumns :: Array (Array Matchable)
  const newColumns = state.columns
    .map(column => column.map(m => {
      if (m.id === action.mid) {
        const newItems = m.items.map(i => i.id === action.id ? toggleItem(i) : i);
        return { ...m, items: newItems };
      }
      return m;
    }));

  // selectedItems :: Array [Item.mid, Item.id]
  const selectedItems = selected(newColumns);

  // selectedIds :: Array Number
  const selectedIds = selectedItems.map(arr => arr[1]);

  // sameColumn :: Bool
  const sameColumn = uniq(selectedIds).length < selectedIds.length;

  // If there are fewer selected items than there are number of columns,
  // and if the selected items are not from the same column...
  if (selectedItems.length < state.itemIds.length && !sameColumn) {
    return { ...state, columns: newColumns, attempted: [] };
  }

  // If previously selected item(s) are from the same column (have same Item.id)...
  if (sameColumn) {
    const updatedColumns = newColumns
      .map(column => column.map(m =>
        ({
          ...m,
          items: m.items.map(i => {
            if (i.mid !== action.mid && i.id === action.id) {
              return deselectItem(i);
            }
            return i;
          }),
        })
      )
    );

    return { ...state, columns: updatedColumns, attempted: [] };
  }

  // selectedMids :: Array Number
  const selectedMids = selectedItems.map(arr => arr[0]);

  // isMatch :: Bool
  const isMatch = uniq(selectedMids).length === 1;

  // If previously selected item(s) create a match (have same Item.mid)...
  if (isMatch) {
    const updatedColumns = newColumns
      .map(column => column.map(m => {
        if (m.id === action.mid) {
          return {
            ...m,
            items: m.items.map(i => deselectItem(i)),
            matched: true,
          };
        }
        return m;
      }));

    const newState = {
      ...state,
      columns: updatedColumns,
      guessesRemaining: state.guessesRemaining - 1,
      correct: state.correct + 1,
      attempted: [],
    };

    if (newState.guessesRemaining === 0) {
      return { ...newState, gameState: END, timerState: STOPPED };
    }

    return newState;
  }

  // If previously selected item(s) don't create a match (have different Item.mid)...
  if (!isMatch) {
    const updatedColumns = newColumns
      .map(column => column.map(m => {
        if (selectedMids.includes(m.id)) {
          return {
            ...m,
            items: m.items.map(i => deselectItem(i)),
          };
        }
        return m;
      }));

    const newState = {
      ...state,
      columns: updatedColumns,
      guessesRemaining: state.guessesRemaining - 1,
      wrong: state.wrong + 1,
      attempted: selectedItems,
    };

    if (newState.guessesRemaining === 0) {
      return { ...newState, gameState: END, timerState: STOPPED };
    }

    return newState;
  }

  console.error('All possible conditions for SELECT_ITEM should have been exhausted');
}
