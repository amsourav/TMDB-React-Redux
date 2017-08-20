import React from "react";
import { Route, Switch } from "react-router-dom";

import App from "./containers/App";
import Popular from "./containers/Popular";
import Header from "./components/Header";
import Error from "./containers/Error";

export default () =>
	<div>
		<Header />
		<div className="Container u-margin-top-gutter">
			<Switch>
				<Route path="/" exact component={App} />
				<Route path="/favorite" exact component={Popular} />
				<Route component={Error} />
			</Switch>
		</div>
	</div>;
