import React, { Component } from "react";
import { renderRoutes } from "react-router-config";
import Header from "./components/Header";

class AppRoot extends Component {
	render() {
		return (
			<div>
				<Header />
				<div className="Container u-margin-top-gutter">
					{renderRoutes(this.props.route.routes)}
				</div>
			</div>
		);
	}
}

export default AppRoot;