import { combineReducers } from 'redux'

import fetchReducer from './fetchReducer'
import likeReducer from './likeReducer'
import sortReducer from './sortReducer'

import { routerReducer } from 'react-router-redux'

const reducers = combineReducers({
	fetchReducer,
	likeReducer,
	sortReducer,
	routing: routerReducer
});

export default reducers;