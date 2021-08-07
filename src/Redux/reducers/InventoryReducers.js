import { InventoryRows } from "../../Static.data/inventory.data";
import {
  ADD_TO_INVENTORY,
  REMOVE_FROM_INVENTORY,
} from "../actions/InventoryActions";

const initialState = {
  inventories: InventoryRows,
};

export const InventoryReducers = (state = initialState, action) => {
  switch (action.type) {
    //add inventories from Inventory form
    case ADD_TO_INVENTORY:
      const newInventory = {
        id: state.inventories.length + 1,
        skuId: action.id,
        name: action.name,
        photos: action.img,
        condition: action.price,
        location: action.location,
        available: action.available,
        reserved: action.reserved,
        onHand: action.onHand,
      };
      return {
        ...state,
        inventories: [...state.inventories, newInventory],
      };

    //remove inventory items
    case REMOVE_FROM_INVENTORY:
      const deleteItems = action.array;
      let remainingItems = [];
      deleteItems.forEach(async (obj, index) => {
        if (index === 0) {
          const filteredItems = state.inventories.filter(
            (item) => item?.sku !== obj?.sku
          );
          remainingItems = [...filteredItems];
        } else if (index > 0) {
          const filteredItems = remainingItems.filter(
            (item) => item?.sku !== obj?.sku
          );
          remainingItems = [...filteredItems];
        }
      });
      const finalItems = [];
      remainingItems.forEach(async (item, i) => {
        return finalItems.push(item);
      });
      return {
        ...state,
        inventories: finalItems,
      };
    default:
      return state;
  }
};
