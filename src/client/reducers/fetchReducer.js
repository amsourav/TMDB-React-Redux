import { FETCH_SUCCESS, FETCH_FALIURE, LIKE_MOVIE, DISLIKE_MOVIE } from "../constants/actionTypes";
import _ from "lodash";

export default function fetchReducer(
	state = {
		isFetchSuccess: null,
		moviesData: null,
		error: {
			code: null,
			text: null
		}
	},
	action
) {
	switch (action.type) {
		case FETCH_SUCCESS:
			let moviesData = [];
			_.forEach(action.payload.results, o => {
				moviesData[o.id] = {
					...o,
					favorite: false
				};
			});
			moviesData = moviesData.filter(x => !!x);
			return {
				...state,
				isFetchSuccess: true,
				moviesData
			};
		case FETCH_FALIURE:
			return {
				...state,
				isFetchSuccess: false,
				error: {
					code: 404,
					text: "Something went wrong!"
				}
			};
		default:
			return state;
	}
}

export const fetchMovieData = (pageNo=1) => (dispatch) => {
	return fetch(`https://api.themoviedb.org/3/movie/popular?api_key=f54c6cba706b27a69fb42891c0161325&language=en-US&page=${pageNo}`)
  		.then(response => response.json())
	  	.then(result => {
	  		dispatch({
	  			type:  FETCH_SUCCESS,
	  			payload: result
	  		})
	  	});
}

export const sortByData = ({ type, payload }) => (dispatch) => {
	return dispatch({
		type,
		payload: {
			...payload
		}
	});
}

export const sortByYear = ({ type, year, payload }) => (dispatch) => {
	return dispatch({
		type: type,
		year,
		payload: {
			...payload
		}
	});
}

export const likeMovie = (id) => (dispatch) => {
	return dispatch({
		type: LIKE_MOVIE,
		payload: {
			id
		}
	});
}

export const dislikeMovie = (id) => (dispatch) => {
	return dispatch({
		type: DISLIKE_MOVIE,
		payload: {
			id
		}
	});
}
