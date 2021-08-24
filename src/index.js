import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { store } from "./Redux/store/Store";
import UserProvider from './context/UserProvider';

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
    <UserProvider>    
      <App />
    </UserProvider>
    </React.StrictMode>
  </Provider>,
  document.getElementById("root")
);

reportWebVitals();
