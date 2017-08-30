import React from "react";
import { connect } from "react-redux";
import MovieCard from "../../components/MovieCard";
import _ from "lodash";

class Popular extends React.Component {
	render() {
		let filteredMovieData = this.props.movies.map(function(data) {
			if (_.includes(this.props.likedMovies, data.id)) {
				return data;
			} else {
				return null;
			}
		}, this);

		let MovieCards = filteredMovieData.map(function(data) {
			if (data !== null) {
				return <MovieCard key={data.id} data={data} />;
			} else {
				return null;
			}
		});

		return (
			<div className="App Container">
				{MovieCards}
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		movies: state.fetchReducer.moviesData,
		likedMovies: state.likeReducer.favMovies
	};
}

export default connect(mapStateToProps, null)(Popular);
