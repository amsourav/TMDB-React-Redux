"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = configureStore;

var _redux = require("redux");

var _reactRouterRedux = require("react-router-redux");

var _reduxDevtoolsExtension = require("redux-devtools-extension");

var _reduxThunk = require("redux-thunk");

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

var _reduxLogger = require("redux-logger");

var _createBrowserHistory = require("history/createBrowserHistory");

var _createBrowserHistory2 = _interopRequireDefault(_createBrowserHistory);

var _createMemoryHistory = require("history/createMemoryHistory");

var _createMemoryHistory2 = _interopRequireDefault(_createMemoryHistory);

var _reduxLocalstorage = require("redux-localstorage");

var _reduxLocalstorage2 = _interopRequireDefault(_reduxLocalstorage);

var _reducers = require("./reducers");

var _reducers2 = _interopRequireDefault(_reducers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function configureStore() {
  var initialState = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var fromServer = arguments[1];

  // initialState will always be Object{} on the server...
  // this will pass to the client so that it will be able to
  // initialize with what the server originally rendered

  var logger = (0, _reduxLogger.createLogger)();
  var history = void 0;

  if (fromServer) {
    // since the server has no HTML5 push states,
    // history must be temporarily created in memory
    history = (0, _createMemoryHistory2.default)();
  } else {
    // on the client, we can go ahead and make a standard
    // `history` state
    history = (0, _createBrowserHistory2.default)();
  }

  // once we init the routerMiddleware with this `history`,
  // compose with devtools (dev) or just apply it (prod)
  var initializedRouterMW = (0, _reactRouterRedux.routerMiddleware)(history);
  // const middleware = process.env.NODE_ENV === 'development' ?
  //   composeWithDevTools(applyMiddleware(initializedRouterMW, thunk)) :
  //   applyMiddleware(initializedRouterMW, thunk);
  var middleware = (0, _reduxDevtoolsExtension.composeWithDevTools)((0, _redux.compose)((0, _redux.applyMiddleware)(initializedRouterMW, _reduxThunk2.default, logger), (0, _reduxLocalstorage2.default)()));

  var store = (0, _redux.createStore)(_reducers2.default, initialState, middleware);

  if (process.env.NODE_ENV === "development") {
    // @TODO: figure out why HMR fails occasionally
    if (module.hot) {
      console.log("HMR Reducers Accepted");
      module.hot.accept("./reducers", function () {
        return store.replaceReducer(require("./reducers"));
      });
    }
  }
  return { history: history, store: store };
} /*
    store.js
  
    Configure redux store
  
    Will be called on both server and client
  */