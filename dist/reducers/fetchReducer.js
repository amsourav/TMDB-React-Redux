"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.dislikeMovie = exports.likeMovie = exports.sortByYear = exports.sortByData = exports.fetchMovieData = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = fetchReducer;

var _actionTypes = require("../constants/actionTypes");

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function fetchReducer() {
	var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
		isFetchSuccess: null,
		moviesData: null,
		error: {
			code: null,
			text: null
		}
	};
	var action = arguments[1];

	switch (action.type) {
		case _actionTypes.FETCH_SUCCESS:
			var moviesData = [];
			_lodash2.default.forEach(action.payload.results, function (o) {
				moviesData[o.id] = _extends({}, o, {
					favorite: false
				});
			});
			moviesData = moviesData.filter(function (x) {
				return !!x;
			});
			return _extends({}, state, {
				isFetchSuccess: true,
				moviesData: moviesData
			});
		case _actionTypes.FETCH_FALIURE:
			return _extends({}, state, {
				isFetchSuccess: false,
				error: {
					code: 404,
					text: "Something went wrong!"
				}
			});
		default:
			return state;
	}
}

var fetchMovieData = exports.fetchMovieData = function fetchMovieData() {
	var pageNo = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
	return function (dispatch) {
		return fetch("https://api.themoviedb.org/3/movie/popular?api_key=f54c6cba706b27a69fb42891c0161325&language=en-US&page=" + pageNo).then(function (response) {
			return response.json();
		}).then(function (result) {
			dispatch({
				type: _actionTypes.FETCH_SUCCESS,
				payload: result
			});
		});
	};
};

var sortByData = exports.sortByData = function sortByData(_ref) {
	var type = _ref.type,
	    payload = _ref.payload;
	return function (dispatch) {
		return dispatch({
			type: type,
			payload: _extends({}, payload)
		});
	};
};

var sortByYear = exports.sortByYear = function sortByYear(_ref2) {
	var type = _ref2.type,
	    year = _ref2.year,
	    payload = _ref2.payload;
	return function (dispatch) {
		return dispatch({
			type: type,
			year: year,
			payload: _extends({}, payload)
		});
	};
};

var likeMovie = exports.likeMovie = function likeMovie(id) {
	return function (dispatch) {
		return dispatch({
			type: _actionTypes.LIKE_MOVIE,
			payload: {
				id: id
			}
		});
	};
};

var dislikeMovie = exports.dislikeMovie = function dislikeMovie(id) {
	return function (dispatch) {
		return dispatch({
			type: _actionTypes.DISLIKE_MOVIE,
			payload: {
				id: id
			}
		});
	};
};