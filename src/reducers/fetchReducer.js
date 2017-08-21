import { FETCH_SUCCESS, FETCH_FALIURE } from "../constants/actionTypes";
import _ from "lodash";

function fetchReducer(
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

export default fetchReducer;
