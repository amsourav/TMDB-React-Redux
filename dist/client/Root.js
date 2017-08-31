"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require("react-redux");

var _reactRouterRedux = require("react-router-redux");

var _store = require("./store");

var _store2 = _interopRequireDefault(_store);

var _routeConfig = require("./route-config");

var _routeConfig2 = _interopRequireDefault(_routeConfig);

var _reactRouterConfig = require("react-router-config");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// the initial state configured on the server is sent through
// the `window` object before the bundle to make sure it doesn't get blocked
var initialState = window.INITIAL_STATE || {};
// once this gets loaded in, garbage collect the old `window` state
delete window.INITIAL_STATE;

var Root = function Root() {
  var _configureStore = (0, _store2.default)(initialState),
      history = _configureStore.history,
      store = _configureStore.store;

  return _react2.default.createElement(
    _reactRedux.Provider,
    { store: store },
    _react2.default.createElement(
      _reactRouterRedux.ConnectedRouter,
      { history: history },
      (0, _reactRouterConfig.renderRoutes)(_routeConfig2.default)
    )
  );
};

exports.default = Root;