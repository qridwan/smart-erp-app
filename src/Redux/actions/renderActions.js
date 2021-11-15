// export const ADD_TO_INVENTORY = "ADD_TO_INVENTORY";
// export const addToCart = (id, name) => {
//   return { type: ADD_TO_INVENTORY, id, name };
// };

// export const removeFromInventory = (array) => {
//   return { type: REMOVE_FROM_INVENTORY, array };
// };

export const SET_SHOW = "SET_SHOW";
export const SET_PATH = "SET_PATH";
export const setPath = (state) => {
  return { type: SET_PATH, state };
};
export const setShow = (state) => {
  return { type: SET_SHOW, state };
};