import { RATE_LOW_HIGH, RATE_HIGH_LOW, POP_LOW_HIGH, POP_HIGH_LOW, SORT_YEAR, UNSORT }  from '../constants/actionTypes'
import _ from 'lodash'

function sortReducer(state={
	type: UNSORT,
	sortedMovies: []
}, action) {
	let filteredMovies = []
	switch(action.type) {
		case RATE_LOW_HIGH:
			filteredMovies = _.sortBy(action.payload, [function(o) {
          							return o.vote_average
    							}]);
			return {
				...state,
				type: RATE_LOW_HIGH,
				sortedMovies: [...filteredMovies]
			}
		case RATE_HIGH_LOW:
			filteredMovies = _.sortBy(action.payload, [function(o) {
          							return -o.vote_average
    							}]);
			return {
				...state,
				type: RATE_HIGH_LOW,
				sortedMovies: [...filteredMovies]
			}
		case POP_LOW_HIGH:
			filteredMovies = _.sortBy(action.payload, [function(o) {
          							return o.vote_count
    							}]);
			return {
				...state,
				type: POP_LOW_HIGH,
				sortedMovies: [...filteredMovies]
			}
		case POP_HIGH_LOW:
			filteredMovies = _.sortBy(action.payload, [function(o) {
          							return -o.vote_count
    							}]);
			return {
				...state,
				type: POP_HIGH_LOW,
				sortedMovies: [...filteredMovies]
			}
		case SORT_YEAR:
			filteredMovies = _.filter(action.payload, function(o) {
				let releaseDate = new Date(o.release_date)
				return action.year.value === releaseDate.getFullYear()
			})

			return {
				...state,
				type: SORT_YEAR,
				sortedMovies: [...filteredMovies]
			}
		case UNSORT: 
			return {
				type: UNSORT,
				sortedMovies: []
			}
		default:
			return state
	}
}

export default sortReducer