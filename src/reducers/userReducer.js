// userReducer.js

const initialState = {
    isSelectGender: false,
    isSelectYear: false,
    gender: null,
    year: null,
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case "TOGGLE_SELECT1":
            return {
                ...state,
                isSelectGender: !state.isSelectGender,
            };
        case "TOGGLE_SELECT":
            return {
                ...state,
                isSelectGender: false,
                isSelectYear: false,
            };
        case "TOGGLE_SELECT2":
            return {
                ...state,
                isSelectYear: !state.isSelectYear,
            };
        case "SET_GENDER":
            return {
                ...state,
                gender: action.payload, // Đặt giá trị gender từ action
            };
        case "SET_YEAR":
            return {
                ...state,
                year: action.payload,
            };
        default:
            return state;
    }
};

export default userReducer;
