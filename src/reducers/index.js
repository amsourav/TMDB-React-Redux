import { combineReducers } from 'redux'

import fetchReducer from './fetchReducer'
import likeReducer from './likeReducer'
import { routerReducer } from 'react-router-redux'

const reducers = combineReducers({
	fetchReducer,
	likeReducer,
	routing: routerReducer
});

export default reducers;