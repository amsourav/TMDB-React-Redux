"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _App = require("./containers/App");

var _App2 = _interopRequireDefault(_App);

var _Popular = require("./containers/Popular");

var _Popular2 = _interopRequireDefault(_Popular);

var _Error = require("./containers/Error");

var _Error2 = _interopRequireDefault(_Error);

var _AppRoot = require("./AppRoot");

var _AppRoot2 = _interopRequireDefault(_AppRoot);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var routes = [{ component: _AppRoot2.default,
  routes: [{ path: '/',
    exact: true,
    component: _App2.default
  }, { path: '/favorite',
    component: _Popular2.default
  }, {
    path: '*',
    component: _Error2.default
  }]
}];

exports.default = routes;