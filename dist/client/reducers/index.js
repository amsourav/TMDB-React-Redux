'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _redux = require('redux');

var _fetchReducer = require('./fetchReducer');

var _fetchReducer2 = _interopRequireDefault(_fetchReducer);

var _likeReducer = require('./likeReducer');

var _likeReducer2 = _interopRequireDefault(_likeReducer);

var _sortReducer = require('./sortReducer');

var _sortReducer2 = _interopRequireDefault(_sortReducer);

var _searchReducer = require('./searchReducer');

var _searchReducer2 = _interopRequireDefault(_searchReducer);

var _reactRouterRedux = require('react-router-redux');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var reducers = (0, _redux.combineReducers)({
	fetchReducer: _fetchReducer2.default,
	likeReducer: _likeReducer2.default,
	sortReducer: _sortReducer2.default,
	searchReducer: _searchReducer2.default,
	routing: _reactRouterRedux.routerReducer
});

exports.default = reducers;