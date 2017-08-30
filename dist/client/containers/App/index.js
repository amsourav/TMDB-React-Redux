"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require("react-redux");

var _redux = require("redux");

var _actionTypes = require("../../constants/actionTypes");

var _MovieCard = require("../../components/MovieCard");

var _MovieCard2 = _interopRequireDefault(_MovieCard);

var _reactSelect = require("react-select");

var _reactSelect2 = _interopRequireDefault(_reactSelect);

var _fetchReducer = require("../../reducers/fetchReducer");

require("isomorphic-fetch");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var App = function (_React$Component) {
	_inherits(App, _React$Component);

	_createClass(App, null, [{
		key: "fetchData",
		value: function fetchData(store) {
			store.dispatch((0, _fetchReducer.fetchMovieData)());
		}
	}]);

	function App(props) {
		_classCallCheck(this, App);

		var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

		_this.logSortSelectChange = _this.logSortSelectChange.bind(_this);
		_this.logYearSelectChange = _this.logYearSelectChange.bind(_this);
		_this.state = {
			movieData: [],
			filteredMovieData: [],
			filteredView: false,
			sortSelectValue: null,
			yearSelectValue: null
		};
		return _this;
	}

	_createClass(App, [{
		key: "logSortSelectChange",
		value: function logSortSelectChange(sortSelectValue) {
			var filteredMovieData = void 0;

			if (sortSelectValue != null) {
				switch (sortSelectValue.value) {
					case "rl":
						this.props.sortByData({
							type: _actionTypes.RATE_LOW_HIGH,
							payload: _extends({}, this.props.movies)
						});
						break;
					case "rh":
						this.props.sortByData({
							type: _actionTypes.RATE_HIGH_LOW,
							payload: _extends({}, this.props.movies)
						});
						break;
					case "pl":
						this.props.sortByData({
							type: _actionTypes.POP_LOW_HIGH,
							payload: _extends({}, this.props.movies)
						});
						break;
					case "ph":
						this.props.sortByData({
							type: _actionTypes.POP_HIGH_LOW,
							payload: _extends({}, this.props.movies)
						});
						break;
					default:
						filteredMovieData = this.props.movies;
				}
			} else {
				filteredMovieData = [];
				this.props.sortByData({
					type: _actionTypes.UNSORT,
					payload: _extends({}, this.props.movies)
				});
			}

			this.setState({
				sortSelectValue: sortSelectValue,
				yearSelectValue: null,
				filteredMovieData: filteredMovieData,
				filteredView: true
			});
		}
	}, {
		key: "logYearSelectChange",
		value: function logYearSelectChange(yearSelectValue) {
			var filteredMovieData = void 0;

			if (yearSelectValue != null) {
				this.props.sortByYear({
					type: _actionTypes.SORT_YEAR,
					year: yearSelectValue,
					payload: _extends({}, this.props.movies)
				});
			} else {
				this.props.sortByYear({
					type: _actionTypes.UNSORT,
					year: yearSelectValue,
					payload: _extends({}, this.props.movies)
				});
			}

			this.setState({
				yearSelectValue: yearSelectValue,
				sortSelectValue: null,
				filteredMovieData: filteredMovieData
			});
		}
	}, {
		key: "componentDidMount",
		value: function componentDidMount() {
			this.props.fetchMovieData();
		}
	}, {
		key: "render",
		value: function render() {
			var MovieCardsDiv = void 0;

			var options = [{ value: "rl", label: "Rating: Low" }, { value: "rh", label: "Rating: High" }, { value: "pl", label: "Popularity: Low" }, { value: "ph", label: "Popularity: High" }];

			var optionYears = [{ value: 2014, label: "2014" }, { value: 2015, label: "2015" }, { value: 2016, label: "2016" }, { value: 2017, label: "2017" }];

			if (this.props.sortedMovies.type !== _actionTypes.UNSORT) {
				MovieCardsDiv = this.props.sortedMovies.payload ? this.props.sortedMovies.payload.map(function (data) {
					if (data !== null) {
						return _react2.default.createElement(_MovieCard2.default, { key: data.id, data: data });
					} else {
						return null;
					}
				}) : null;
			} else if (this.props.search.payload.term !== "") {
				MovieCardsDiv = this.props.search.payload.filteredMovies.length ? this.props.search.payload.filteredMovies.map(function (data) {
					return _react2.default.createElement(_MovieCard2.default, { key: data.id, data: data });
				}) : _react2.default.createElement(
					"div",
					{ className: "Jumbotron" },
					"No Movies Found that match the search criteria"
				);
			} else {
				MovieCardsDiv = this.props.movies.length ? this.props.movies.map(function (data) {
					if (data !== null) {
						return _react2.default.createElement(_MovieCard2.default, { key: data.id, data: data });
					} else {
						return null;
					}
				}) : null;
			}

			return _react2.default.createElement(
				"div",
				{ className: "App Container" },
				_react2.default.createElement(
					"div",
					{ className: "selectContainer", style: { marginBottom: 17 } },
					_react2.default.createElement(
						"div",
						{ className: "sortSelect" },
						_react2.default.createElement(_reactSelect2.default, {
							options: options,
							onChange: this.logSortSelectChange,
							placeholder: "Sort by",
							value: this.state.sortSelectValue
						})
					),
					_react2.default.createElement(
						"div",
						{ className: "yearSelect" },
						_react2.default.createElement(_reactSelect2.default, {
							options: optionYears,
							onChange: this.logYearSelectChange,
							placeholder: "Year",
							value: this.state.yearSelectValue
						})
					)
				),
				_react2.default.createElement(
					"div",
					{ className: "movieContainer" },
					MovieCardsDiv
				)
			);
		}
	}]);

	return App;
}(_react2.default.Component);

function mapStateToProps(state) {
	return {
		movies: state.fetchReducer.moviesData || [],
		sortedMovies: {
			type: state.sortReducer.type,
			payload: state.sortReducer.sortedMovies
		},
		search: state.searchReducer
	};
}
var mapDispatchToProps = function mapDispatchToProps(dispatch) {
	return (0, _redux.bindActionCreators)({
		fetchMovieData: _fetchReducer.fetchMovieData,
		sortByData: _fetchReducer.sortByData,
		sortByYear: _fetchReducer.sortByYear,
		likeMovie: _fetchReducer.likeMovie,
		dislikeMovie: _fetchReducer.dislikeMovie
	}, dispatch);
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(App);