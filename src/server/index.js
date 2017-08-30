import express from "express";
import request from "request";

import React, { Component } from "react";
import { renderToString } from "react-dom/server";

import StaticRouter from "react-router-dom/StaticRouter";
import { matchRoutes, renderRoutes } from "react-router-config";

import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import routes from "../client/route-config";
import reducers from "../client/reducers";

/*eslint-disable*/
const router = express.Router();
/*eslint-enable*/
const middlewares = [thunk];

const store = createStore(reducers, applyMiddleware(...middlewares));

router.get("*", (req, res) => {
  const branch = matchRoutes(routes, req.url);
  const promises = branch.map(({ route }) => {
    let fetchData = route.component.fetchData;
    return fetchData instanceof Function
      ? fetchData(store)
      : Promise.resolve(null);
  });
  return Promise.all(promises).then(data => {
    let context = {};
    const content = renderToString(
      <Provider store={store}>
        <StaticRouter location={req.url} context={context}>
          {renderRoutes(routes)}
        </StaticRouter>
      </Provider>
    );
    if (context.status === 404) {
      res.status(404);
    }
    if (context.status === 302) {
      return res.redirect(302, context.url);
    }
    res.render("index", { title: "BMDB", data: store.getState(), content });
  });
});

module.exports = router;