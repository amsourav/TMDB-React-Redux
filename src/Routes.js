import React from 'react';
import { Route, Switch } from 'react-router-dom';

import App from './containers/App';
import Header from './components/Header' 
import DevTools from './containers/DevTools'
import Error from './containers/Error'

export default () => (
  <div>
  	<Header />
    <DevTools />
    <div className="Container u-margin-top-gutter">
	  	<Switch>
		    <Route path="/" exact component={App} />
		    <Route component={Error} />
		</Switch>
	</div>
  </div>
);