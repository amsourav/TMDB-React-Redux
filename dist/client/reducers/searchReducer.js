"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _actionTypes = require("../constants/actionTypes");

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function searchReducer() {
	var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
		payload: {
			term: "",
			target: [],
			isSearchActive: false,
			filteredMovies: []
		}
	};
	var action = arguments[1];

	switch (action.type) {
		case _actionTypes.SEARCH:
			var filteredMovies = _lodash2.default.filter(action.payload.target, function (o) {
				return o.title.toLowerCase().includes(action.payload.term.toLowerCase());
			});
			return _extends({}, state, {
				payload: _extends({}, action.payload, {
					isSearchActive: action.payload.term ? true : false,
					filteredMovies: filteredMovies
				})
			});
		default:
			return state;
	}
}

exports.default = searchReducer;