import { LIKE_MOVIE, DISLIKE_MOVIE } from '../constants/actionTypes'

function likeReducer(state={
	favMovies: []
}, action) {
	switch (action.type) {
		case LIKE_MOVIE:
			return {
				...state,
				favMovies: [...state.favMovies, action.payload.id]
			}
		case DISLIKE_MOVIE:
			return {
				...state,
				favMovies: state.favMovies.filter(id => id!==action.payload.id)
			}
		default:
			return state
	}
}

export default likeReducer;