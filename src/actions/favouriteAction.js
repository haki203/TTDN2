// Định nghĩa hành động liên quan đến danh sách yêu thích:
import { ADD_TO_FAVOURITES } from './actionTypes';

export const addToFavourites = (book) => ({
  type: ADD_TO_FAVOURITES,
  payload: book,
});
