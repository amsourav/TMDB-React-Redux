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

function sortReducer() {
	var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
		type: _actionTypes.UNSORT,
		sortedMovies: []
	};
	var action = arguments[1];

	var filteredMovies = [];
	switch (action.type) {
		case _actionTypes.RATE_LOW_HIGH:
			filteredMovies = _lodash2.default.sortBy(action.payload, [function (o) {
				return o.vote_average;
			}]);
			return _extends({}, state, {
				type: _actionTypes.RATE_LOW_HIGH,
				sortedMovies: [].concat(_toConsumableArray(filteredMovies))
			});
		case _actionTypes.RATE_HIGH_LOW:
			filteredMovies = _lodash2.default.sortBy(action.payload, [function (o) {
				return -o.vote_average;
			}]);
			return _extends({}, state, {
				type: _actionTypes.RATE_HIGH_LOW,
				sortedMovies: [].concat(_toConsumableArray(filteredMovies))
			});
		case _actionTypes.POP_LOW_HIGH:
			filteredMovies = _lodash2.default.sortBy(action.payload, [function (o) {
				return o.vote_count;
			}]);
			return _extends({}, state, {
				type: _actionTypes.POP_LOW_HIGH,
				sortedMovies: [].concat(_toConsumableArray(filteredMovies))
			});
		case _actionTypes.POP_HIGH_LOW:
			filteredMovies = _lodash2.default.sortBy(action.payload, [function (o) {
				return -o.vote_count;
			}]);
			return _extends({}, state, {
				type: _actionTypes.POP_HIGH_LOW,
				sortedMovies: [].concat(_toConsumableArray(filteredMovies))
			});
		case _actionTypes.SORT_YEAR:
			filteredMovies = _lodash2.default.filter(action.payload, function (o) {
				var releaseDate = new Date(o.release_date);
				return action.year.value === releaseDate.getFullYear();
			});

			return _extends({}, state, {
				type: _actionTypes.SORT_YEAR,
				sortedMovies: [].concat(_toConsumableArray(filteredMovies))
			});
		case _actionTypes.UNSORT:
			return {
				type: _actionTypes.UNSORT,
				sortedMovies: []
			};
		default:
			return state;
	}
}

exports.default = sortReducer;