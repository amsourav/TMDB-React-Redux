import React from "react";
import { Provider } from "react-redux";
import { ConnectedRouter } from "react-router-redux";
import configureStore from "./store";
import routes from './route-config';
import { renderRoutes } from "react-router-config";

// the initial state configured on the server is sent through
// the `window` object before the bundle to make sure it doesn't get blocked
const initialState = window.INITIAL_STATE || {};
// once this gets loaded in, garbage collect the old `window` state
delete window.INITIAL_STATE;

const Root = () => {
  const { history, store } = configureStore(initialState);
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        {renderRoutes(routes)}
      </ConnectedRouter>
    </Provider>
  );
};

export default Root;
