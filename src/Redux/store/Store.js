import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { InventoryReducers } from "../reducers/InventoryReducers";

export const store = createStore(InventoryReducers,
    applyMiddleware(thunk) )