// Định nghĩa reducer quản lý trạng thái đăng nhập
import { LOGIN_SUCCESS } from '../actions/actionTypes';

const initialState = {
  user: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
