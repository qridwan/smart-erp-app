export const ADD_TO_INVENTORY = "ADD_TO_INVENTORY";
export const REMOVE_FROM_INVENTORY = "REMOVE_FROM_INVENTORY";

export const addToCart = (id, name) => {
  return { type: ADD_TO_INVENTORY, id, name };
};

export const removeFromInventory = (array) => {
  return { type: REMOVE_FROM_INVENTORY, array };
};
