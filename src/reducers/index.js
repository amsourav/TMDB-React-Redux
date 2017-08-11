import { combineReducers } from "redux";

import fetchReducer from "./fetchReducer";
import likeReducer from "./likeReducer";
import sortReducer from "./sortReducer";
import searchReducer from "./searchReducer";

import { routerReducer } from "react-router-redux";

const reducers = combineReducers({
  fetchReducer,
  likeReducer,
  sortReducer,
  searchReducer,
  routing: routerReducer
});

export default reducers;
