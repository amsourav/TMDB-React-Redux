"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = require("react-router-dom");

var _reactFontawesome = require("react-fontawesome");

var _reactFontawesome2 = _interopRequireDefault(_reactFontawesome);

var _reactRedux = require("react-redux");

require("./Header.less");

var _logo = require("./logo.png");

var _logo2 = _interopRequireDefault(_logo);

var _actionTypes = require("../../constants/actionTypes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Header = function (_React$Component) {
	_inherits(Header, _React$Component);

	function Header(props) {
		_classCallCheck(this, Header);

		var _this = _possibleConstructorReturn(this, (Header.__proto__ || Object.getPrototypeOf(Header)).call(this, props));

		_this.inputHandler = _this.inputHandler.bind(_this);
		_this.injectSearchForm = _this.injectSearchForm.bind(_this);
		_this.hideSearchForm = _this.hideSearchForm.bind(_this);
		_this.state = {
			search: props.search.payload.term ? true : false
		};
		return _this;
	}

	_createClass(Header, [{
		key: "hideSearchForm",
		value: function hideSearchForm() {
			this.state = {
				search: false
			};
			this.props.searchMovie({
				type: _actionTypes.SEARCH,
				term: "",
				target: []
			});
		}
	}, {
		key: "injectSearchForm",
		value: function injectSearchForm() {
			this.setState({
				search: true
			});
		}
	}, {
		key: "inputHandler",
		value: function inputHandler(e) {
			this.props.searchMovie({
				type: _actionTypes.SEARCH,
				term: e.target.value,
				target: this.props.searchableMovies
			});
		}
	}, {
		key: "render",
		value: function render() {
			return _react2.default.createElement(
				"header",
				{ className: "Header" },
				_react2.default.createElement(
					"div",
					{ className: "Container" },
					_react2.default.createElement(
						"div",
						{ className: "Header__wrap" },
						_react2.default.createElement(
							"div",
							{ className: "Header__left" },
							_react2.default.createElement(
								_reactRouterDom.Link,
								{ to: "/" },
								_react2.default.createElement("img", {
									src: _logo2.default,
									alt: "BMDB",
									className: "Header__logo"
								})
							)
						),
						!this.state.search ? _react2.default.createElement(
							"div",
							{ className: "Header__right" },
							_react2.default.createElement(
								_reactRouterDom.Link,
								{ className: "Header__item", to: "/" },
								_react2.default.createElement(
									"span",
									{ className: "u-text" },
									"POPULAR"
								)
							),
							_react2.default.createElement(
								_reactRouterDom.Link,
								{ className: "Header__item", to: "/favorite" },
								_react2.default.createElement(
									"span",
									{ className: "u-text" },
									"FAVORITE"
								)
							),
							_react2.default.createElement(
								"div",
								{
									className: "Header__item",
									onClick: this.injectSearchForm
								},
								_react2.default.createElement(_reactFontawesome2.default, { name: "search" })
							)
						) : _react2.default.createElement(
							"div",
							{ className: "Header__right" },
							_react2.default.createElement(
								"div",
								{ className: "Header__item" },
								_react2.default.createElement("input", {
									placeholder: "Search...",
									value: this.props.search.payload.term,
									style: { marginRight: 15 },
									onChange: this.inputHandler
								}),
								_react2.default.createElement(
									"span",
									{ onClick: this.hideSearchForm },
									_react2.default.createElement(_reactFontawesome2.default, { name: "times" })
								)
							)
						)
					)
				)
			);
		}
	}]);

	return Header;
}(_react2.default.Component);

function mapStateToProps(state) {
	return {
		searchableMovies: state.fetchReducer.moviesData,
		search: state.searchReducer
	};
}

function mapDispatchToProps(dispatch) {
	return {
		searchMovie: function searchMovie(_ref) {
			var type = _ref.type,
			    term = _ref.term,
			    target = _ref.target;

			dispatch({
				type: type,
				payload: {
					term: term,
					target: target
				}
			});
		}
	};
}

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Header);