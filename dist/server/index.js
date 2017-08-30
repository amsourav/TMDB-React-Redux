"use strict";

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _request = require("request");

var _request2 = _interopRequireDefault(_request);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _server = require("react-dom/server");

var _StaticRouter = require("react-router-dom/StaticRouter");

var _StaticRouter2 = _interopRequireDefault(_StaticRouter);

var _reactRouterConfig = require("react-router-config");

var _redux = require("redux");

var _reactRedux = require("react-redux");

var _reduxThunk = require("redux-thunk");

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

var _routeConfig = require("../client/route-config");

var _routeConfig2 = _interopRequireDefault(_routeConfig);

var _reducers = require("../client/reducers");

var _reducers2 = _interopRequireDefault(_reducers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*eslint-disable*/
var router = _express2.default.Router();
/*eslint-enable*/
var middlewares = [_reduxThunk2.default];

var store = (0, _redux.createStore)(_reducers2.default, _redux.applyMiddleware.apply(undefined, middlewares));

router.get("*", function (req, res) {
  var branch = (0, _reactRouterConfig.matchRoutes)(_routeConfig2.default, req.url);
  var promises = branch.map(function (_ref) {
    var route = _ref.route;

    var fetchData = route.component.fetchData;
    return fetchData instanceof Function ? fetchData(store) : Promise.resolve(null);
  });
  return Promise.all(promises).then(function (data) {
    var context = {};
    var content = (0, _server.renderToString)(_react2.default.createElement(
      _reactRedux.Provider,
      { store: store },
      _react2.default.createElement(
        _StaticRouter2.default,
        { location: req.url, context: context },
        (0, _reactRouterConfig.renderRoutes)(_routeConfig2.default)
      )
    ));
    if (context.status === 404) {
      res.status(404);
    }
    if (context.status === 302) {
      return res.redirect(302, context.url);
    }
    res.render("index", { title: "BMDB", data: store.getState(), content: content });
  });
});

module.exports = router;