import { SEARCH }  from '../constants/actionTypes'
import _ from 'lodash'

function searchReducer(state={
	payload: {
		term: ''
	}
}, action) {
	switch(action.type) {
		case SEARCH:
			return {
				...state,
				payload: {
					...action.payload
				}
			}
		default:
			return state;
	}	
}

export default searchReducer;