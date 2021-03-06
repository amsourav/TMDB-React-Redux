/*
  store.js

  Configure redux store

  Will be called on both server and client
*/

import { createStore, applyMiddleware, compose } from "redux";
import { routerMiddleware } from "react-router-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";
import createHistory from "history/createBrowserHistory";
import createMemoryHistory from "history/createMemoryHistory";
import persistState from 'redux-localstorage'

import reducers from "./reducers";

export default function configureStore(initialState = {}, fromServer) {
  // initialState will always be Object{} on the server...
  // this will pass to the client so that it will be able to
  // initialize with what the server originally rendered

  const logger = createLogger();
  let history;

  if (fromServer) {
    // since the server has no HTML5 push states,
    // history must be temporarily created in memory
    history = createMemoryHistory();
  } else {
    // on the client, we can go ahead and make a standard
    // `history` state
    history = createHistory();
  }

  // once we init the routerMiddleware with this `history`,
  // compose with devtools (dev) or just apply it (prod)
  const initializedRouterMW = routerMiddleware(history);
  // const middleware = process.env.NODE_ENV === 'development' ?
  //   composeWithDevTools(applyMiddleware(initializedRouterMW, thunk)) :
  //   applyMiddleware(initializedRouterMW, thunk);
  const middleware = composeWithDevTools(
    compose(
      applyMiddleware(initializedRouterMW, thunk, logger),
      persistState()
    )
  );

  const store = createStore(reducers, initialState, middleware);

  if (process.env.NODE_ENV === "development") {
    // @TODO: figure out why HMR fails occasionally
    if (module.hot) {
      console.log("HMR Reducers Accepted");
      module.hot.accept("./reducers", () =>
        store.replaceReducer(require("./reducers"))
      );
    }
  }
  return { history, store };
}
