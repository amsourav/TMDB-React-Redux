"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
var getMovieData = exports.getMovieData = function getMovieData() {
	var pageNo = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

	return fetch("https://api.themoviedb.org/3/movie/popular?api_key=f54c6cba706b27a69fb42891c0161325&language=en-US&page=" + pageNo).then(function (response) {
		return response.json();
	}).then(function (result) {
		return result;
	});
};