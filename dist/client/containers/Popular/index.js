"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require("react-redux");

var _MovieCard = require("../../components/MovieCard");

var _MovieCard2 = _interopRequireDefault(_MovieCard);

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Popular = function (_React$Component) {
	_inherits(Popular, _React$Component);

	function Popular() {
		_classCallCheck(this, Popular);

		return _possibleConstructorReturn(this, (Popular.__proto__ || Object.getPrototypeOf(Popular)).apply(this, arguments));
	}

	_createClass(Popular, [{
		key: "render",
		value: function render() {
			var filteredMovieData = this.props.movies.map(function (data) {
				if (_lodash2.default.includes(this.props.likedMovies, data.id)) {
					return data;
				} else {
					return null;
				}
			}, this);

			var MovieCards = filteredMovieData.map(function (data) {
				if (data !== null) {
					return _react2.default.createElement(_MovieCard2.default, { key: data.id, data: data });
				} else {
					return null;
				}
			});

			return _react2.default.createElement(
				"div",
				{ className: "App Container" },
				MovieCards
			);
		}
	}]);

	return Popular;
}(_react2.default.Component);

function mapStateToProps(state) {
	return {
		movies: state.fetchReducer.moviesData,
		likedMovies: state.likeReducer.favMovies
	};
}

exports.default = (0, _reactRedux.connect)(mapStateToProps, null)(Popular);