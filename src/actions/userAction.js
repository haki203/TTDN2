export const setGender = (newGender) => {
  return {
    type: "SET_GENDER",
    payload: newGender,
  };
};
export const setYear = (newYear) => {
  return {
    type: "SET_YEAR",
    payload: newYear,
  };
};