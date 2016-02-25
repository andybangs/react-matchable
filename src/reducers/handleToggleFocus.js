// handleSelectItem :: QuizState -> Action -> QuizState
export default function handleToggleFocus(state, action) {
  if (!state.studyMode) return state;

  const updatedColumns = state.columns
    .map(column => column.map(m => {
      if (m.id === action.mid) {
        return { ...m, items: m.items.map(i => ({ ...i, focused: true })) };
      }
      return { ...m, items: m.items.map(i => ({ ...i, focused: false })) };
    })
  );

  return { ...state, columns: updatedColumns };
}
