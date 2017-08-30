"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Error = function Error() {
	return _react2.default.createElement(
		"div",
		{ className: "Container" },
		_react2.default.createElement(
			"h1",
			null,
			"Oops!"
		)
	);
};

exports.default = Error;