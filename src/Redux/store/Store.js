import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { renderReducers } from "../reducers/renderReducers";
import { composeWithDevTools } from "redux-devtools-extension";

export const store = createStore(
  renderReducers,
  composeWithDevTools(applyMiddleware(thunk))
);
