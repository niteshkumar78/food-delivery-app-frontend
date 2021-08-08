import "bootstrap/dist/css/bootstrap.min.css";

import "bootstrap/dist/js/bootstrap.bundle.min";

import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import { createStore, applyMiddleware } from "redux";

import "./index.css";
import App from "./components/App";
import reducer from "./reducer";

const store = createStore(reducer);

console.log("Redux Store", store);

// console.log("Redux State BEFORE", store.getState());

// store.dispatch({
//   type: "TEST",
//   data: {
//     message: "TEST REDUX",
//   },
// });

// console.log("Redux State AFTER", store.getState());

ReactDOM.render(
  <React.StrictMode>
    <App store={store} />
  </React.StrictMode>,
  document.getElementById("root")
);
