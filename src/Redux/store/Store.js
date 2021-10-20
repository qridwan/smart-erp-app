import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { renderReducers } from "../reducers/renderReducers";

export const store = createStore(renderReducers, applyMiddleware(thunk));
