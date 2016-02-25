import {
  REQUEST_QUIZ,
  RECEIVE_QUIZ,
  SET_STATE,
  SELECT_ITEM,
  TOGGLE_FOCUS,
  RESET_STATE,
} from '../constants';
import handleSelectItem from './handleSelectItem';
import handleToggleFocus from './handleToggleFocus';

const initialState = {
  data: {},
  cachedData: {},
  isFetching: false,
};

export default function quiz(state = initialState, action) {
  switch (action.type) {
    case REQUEST_QUIZ:
      return { ...state, isFetching: true };

    case RECEIVE_QUIZ:
      return {
        ...state,
        data: action.data,
        cachedData: action.data,
        isFetching: false,
      };

    case SET_STATE:
      return { ...state, data: { ...state.data, gameState: action.gameState } };

    case SELECT_ITEM:
      const updatedQuizData = handleSelectItem(state.data, action);
      return { ...state, data: updatedQuizData };

    case TOGGLE_FOCUS:
      const toggledQuizData = handleToggleFocus(state.data, action);
      return { ...state, data: toggledQuizData };

    case RESET_STATE:
      return { ...state, data: state.cachedData };

    default:
      return state;
  }
}
