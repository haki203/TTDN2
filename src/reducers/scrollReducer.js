// scrollReducer.js
import { SCROLL_UP, SCROLL_DOWN } from '../actions/scrollActions';

const initialState = {
  isTabVisible: 'flex', // Giá trị mặc định
};

const scrollReducer = (state = initialState, action) => {
  switch (action.type) {
    case SCROLL_UP:
      return { ...state, isTabVisible: 'flex' }; // Scroll up, show the tab
    case SCROLL_DOWN:
      return { ...state, isTabVisible: 'none' }; // Scroll down, hide the tab
    default:
      return state;
  }
};

export default scrollReducer;
