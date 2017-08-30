"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactFontawesome = require("react-fontawesome");

var _reactFontawesome2 = _interopRequireDefault(_reactFontawesome);

require("./MovieCard.less");

var _Overlay = require("../Overlay");

var _Overlay2 = _interopRequireDefault(_Overlay);

var _dateHelper = require("../../utils/dateHelper");

var _reactRedux = require("react-redux");

var _actionTypes = require("../../constants/actionTypes");

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MovieCard = function (_React$Component) {
	_inherits(MovieCard, _React$Component);

	function MovieCard(props) {
		_classCallCheck(this, MovieCard);

		var _this = _possibleConstructorReturn(this, (MovieCard.__proto__ || Object.getPrototypeOf(MovieCard)).call(this, props));

		_this.getImageURL = _this.getImageURL.bind(_this);
		_this.handleLike = _this.handleLike.bind(_this);
		return _this;
	}

	_createClass(MovieCard, [{
		key: "getImageURL",
		value: function getImageURL(imagePath) {
			return "https://image.tmdb.org/t/p/w300" + imagePath;
		}
	}, {
		key: "handleLike",
		value: function handleLike() {
			if (_lodash2.default.includes(this.props.likedMovies, this.props.data.id)) {
				this.props.likeMovie({
					type: _actionTypes.DISLIKE_MOVIE,
					payload: {
						id: this.props.data.id
					}
				});
			} else {
				this.props.likeMovie({
					type: _actionTypes.LIKE_MOVIE,
					payload: {
						id: this.props.data.id
					}
				});
			}
		}
	}, {
		key: "render",
		value: function render() {
			var heartIcon = _lodash2.default.includes(this.props.likedMovies, this.props.data.id) ? _react2.default.createElement(_reactFontawesome2.default, { style: { color: "red" }, name: "heart" }) : _react2.default.createElement(_reactFontawesome2.default, { name: "heart-o" });
			return _react2.default.createElement(
				"div",
				{ key: this.props.data.id, className: "MovieCard" },
				_react2.default.createElement(
					"div",
					{ className: "MovieCard__Poster" },
					_react2.default.createElement("img", {
						src: this.getImageURL(this.props.data.poster_path),
						alt: this.props.data.title
					})
				),
				_react2.default.createElement(_Overlay2.default, null),
				_react2.default.createElement(
					"div",
					{ className: "MovieCard__InnerContainer" },
					_react2.default.createElement(
						"div",
						{ className: "MovieCard__releaseDate p-absolute u-text p-topLeft" },
						(0, _dateHelper.releaseDateFormatted)(this.props.data.release_date)
					),
					_react2.default.createElement(
						"div",
						{ className: "MovieCard__userInteractionContainer p-absolute p-topRight" },
						_react2.default.createElement(
							"div",
							{
								className: "Icon Icon__noPadding u-text",
								onClick: this.handleLike
							},
							heartIcon
						),
						_react2.default.createElement(
							"div",
							{ className: "Icon Icon__noPadding u-text" },
							_react2.default.createElement(_reactFontawesome2.default, { name: "comment" })
						),
						_react2.default.createElement(
							"div",
							{ className: "Icon Icon__noPadding Icon__unsetWidth u-text u-cursor-pointer" },
							_react2.default.createElement(_reactFontawesome2.default, { name: "star-o" }),
							_react2.default.createElement(
								"span",
								{ className: "favortites u-padding-6p-left" },
								this.props.data.vote_count
							)
						)
					),
					_react2.default.createElement(
						"div",
						{ className: "MovieCard__movieDetails p-absolute p-bottomLeft" },
						_react2.default.createElement("div", { className: "MovieCard__lanugage u-text" }),
						_react2.default.createElement(
							"div",
							{ className: "MovieCard__name u-text" },
							this.props.data.title
						),
						_react2.default.createElement(
							"div",
							{ className: "MovieCard__share" },
							_react2.default.createElement(
								"div",
								{ className: "Icon Icon__Circular u-text u-color-fb u-cursor-pointer" },
								_react2.default.createElement(_reactFontawesome2.default, { name: "facebook" })
							),
							_react2.default.createElement(
								"div",
								{ className: "Icon Icon__Circular u-text u-color-twitter u-cursor-pointer" },
								_react2.default.createElement(_reactFontawesome2.default, { name: "twitter" })
							),
							_react2.default.createElement(
								"div",
								{ className: "Icon Icon__Circular u-text u-color-whatsapp u-cursor-pointer" },
								_react2.default.createElement(_reactFontawesome2.default, { name: "whatsapp" })
							)
						)
					)
				)
			);
		}
	}]);

	return MovieCard;
}(_react2.default.Component);

function mapStateToProps(state) {
	return {
		likedMovies: state.likeReducer.favMovies
	};
}

function mapDispatchToProps(dispatch) {
	return {
		likeMovie: function likeMovie(_ref) {
			var type = _ref.type,
			    payload = _ref.payload;

			dispatch({
				type: type,
				payload: payload
			});
		}
	};
}

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(MovieCard);