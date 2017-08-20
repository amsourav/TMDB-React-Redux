import { SEARCH }  from '../constants/actionTypes'
import _ from 'lodash'

function searchReducer(state={
	payload: {
		term: '',
		target: [],
		isSearchActive: false,
		filteredMovies: []
	}
}, action) {
	switch(action.type) {
		case SEARCH:
			let filteredMovies = _.filter(action.payload.target, (o) => {
				return o.title.toLowerCase().includes(action.payload.term.toLowerCase())
			})
			return {
				...state,
				payload: {
					...action.payload,
					isSearchActive: action.payload.term?true:false,
					filteredMovies: filteredMovies
				}
			}
		default:
			return state;
	}	
}

export default searchReducer;