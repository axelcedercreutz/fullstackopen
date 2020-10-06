import React from "react";

import { createStore, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import filterReducer from "./reducers/filterReducer";
import notificationReducer from "./reducers/notificationReducer";
import anecdoteReducer from "./reducers/anecdoteReducer";

const reducer = combineReducers({
  anecdotes: anecdoteReducer,
  notification: notificationReducer,
  filter: filterReducer,
});

export const store = createStore(reducer, composeWithDevTools());
