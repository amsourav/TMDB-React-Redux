import React from "react";
import { createStore, compose, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import createHistory from "history/createBrowserHistory";
import { ConnectedRouter, routerMiddleware } from "react-router-redux";
import { createLogger } from "redux-logger";
import thunk from "redux-thunk";
import persistState from "redux-localstorage";
import DevTools from "./containers/DevTools";
import reducers from "./reducers";
import Routes from "./Routes";

const Root = () => {
  const logger = createLogger();
  const history = createHistory();
  const store = createStore(
    reducers,
    {},
    compose(
      applyMiddleware(routerMiddleware(history)),
      applyMiddleware(logger),
      applyMiddleware(thunk),
      persistState(),
      DevTools.instrument()
    )
  );
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Routes />
      </ConnectedRouter>
    </Provider>
  );
};

export default Root;
