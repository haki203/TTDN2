// Định nghĩa hành động liên quan đến đăng nhập:
import { LOGIN_SUCCESS } from './actionTypes';

export const loginSuccess = (user) => ({
  type: LOGIN_SUCCESS,
  payload: user,
});
