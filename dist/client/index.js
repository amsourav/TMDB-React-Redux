'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _Root = require('./Root');

var _Root2 = _interopRequireDefault(_Root);

var _registerServiceWorker = require('./registerServiceWorker');

var _registerServiceWorker2 = _interopRequireDefault(_registerServiceWorker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import './index.less'
// import './react-select.less'

_reactDom2.default.render(_react2.default.createElement(_Root2.default, null), document.getElementById('root'));
(0, _registerServiceWorker2.default)();