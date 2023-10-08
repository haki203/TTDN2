// reducers/playReducer.js
const initialState = {
  isPlay: false,
};

const playReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'TOGGLE_IS_PLAY':
      return {
        ...state,
        isPlay: !state.isPlay,
      };
      case 'SET_IS_PLAY':
      return {
        ...state,
        isPlay: action.payload,
      };
    default:
      return state;
  }
};

export default playReducer;
