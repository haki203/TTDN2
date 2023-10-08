// Định nghĩa reducer quản lý trạng thái danh sách yêu thích:
import { ADD_TO_FAVOURITES } from '../actions/actionTypes';

const initialState = {
  favourites: [],
};

const favouriteReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_FAVOURITES:
      return {
        ...state,
        favourites: [...state.favourites, action.payload],
      };
    default:
      return state;
  }
};

export default favouriteReducer;
