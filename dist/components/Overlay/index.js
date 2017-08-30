'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

require('./Overlay.less');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Overlay() {
	return _react2.default.createElement('div', { className: '__overlay' });
}

exports.default = Overlay;