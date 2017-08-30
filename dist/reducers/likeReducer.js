"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _actionTypes = require("../constants/actionTypes");

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function likeReducer() {
	var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
		type: null,
		favMovies: [],
		payload: {
			id: null
		}
	};
	var action = arguments[1];

	switch (action.type) {
		case _actionTypes.LIKE_MOVIE:
			return _extends({}, state, {
				favMovies: _lodash2.default.uniq([].concat(_toConsumableArray(state.favMovies), [action.payload.id]))
			});
		case _actionTypes.DISLIKE_MOVIE:
			return _extends({}, state, {
				favMovies: state.favMovies.filter(function (id) {
					return id !== action.payload.id;
				})
			});
		default:
			return state;
	}
}

exports.default = likeReducer;