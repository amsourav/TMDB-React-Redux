import { RATE_LOW_HIGH, RATE_HIGH_LOW, POP_LOW_HIGH, POP_HIGH_LOW }  from '../constants/actionTypes'

function sortReducer(state={
	type: null,
	sortedMovies: []
}, action) {
	switch(action.type) {
		case RATE_LOW_HIGH:
			return {
				...state,
				type: RATE_LOW_HIGH,
				sortedMovies: []
			}
		case RATE_HIGH_LOW:
			return {
				...state,
				type: RATE_HIGH_LOW,
				sortedMovies: []
			}
		case POP_LOW_HIGH:
			return {
				...state,
				type: POP_LOW_HIGH,
				sortedMovies: []
			}
		case POP_HIGH_LOW:
			return {
				...state,
				type: POP_HIGH_LOW,
				sortedMovies: []
			}
		default:
			return state
	}
}

export default sortReducer