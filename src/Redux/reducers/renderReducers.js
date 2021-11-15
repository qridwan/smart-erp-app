import { SET_PATH, SET_SHOW } from "../actions/renderActions";

const initialState = {
  inventories: "",
  path: "inventory",
  show: "inventoryTable",
};

export const renderReducers = (state = initialState, action) => {
  switch (action.type) {
    case SET_PATH:
      return {
        ...state,
        path: action.state,
      };
    case SET_SHOW:
      return {
        ...state,
        show: action.state,
      };
    default:
      return state;
  }
  // case ADD_TO_INVENTORY:
  //   const newInventory = {
  //     id: state.inventories.length + 1,
  //     skuId: action.id,
  //     name: action.name,
  //     photos: action.img,
  //     condition: action.price,
  //     location: action.location,
  //     available: action.available,
  //     reserved: action.reserved,
  //     onHand: action.onHand,
  //   };
  //   return {
  //     ...state,
  //     inventories: [...state.inventories, newInventory],
  //   };

  // //remove inventory items
  // case REMOVE_FROM_INVENTORY:
  //   const deleteItems = action.array;
  //   let remainingItems = [];
  //   deleteItems.forEach(async (obj, index) => {
  //     if (index === 0) {
  //       const filteredItems = state.inventories.filter(
  //         (item) => item?.sku !== obj?.sku
  //       );
  //       remainingItems = [...filteredItems];
  //     } else if (index > 0) {
  //       const filteredItems = remainingItems.filter(
  //         (item) => item?.sku !== obj?.sku
  //       );
  //       remainingItems = [...filteredItems];
  //     }
  //   });
  //   const finalItems = [];
  //   remainingItems.forEach(async (item, i) => {
  //     return finalItems.push(item);
  //   });
  //   return {
  //     ...state,
  //     inventories: finalItems,
  //   };
};
