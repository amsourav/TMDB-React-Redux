import React from 'react'
import { connect } from 'react-redux'
import { getMovieData } from '../../actions/movieData'
import { FETCH_SUCCESS } from '../../constants/actionTypes'
import MovieCard from '../../components/MovieCard';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.handleLike = this.handleLike.bind(this)
	}

	handleLike() {

	}

	componentDidMount() {
		this.props.fetchData()
	}

	render() {

		let MovieCardsDiv = this.props.movies.map(data => {
			if (data !== null) {
				return <MovieCard key={data.id} data={data} handleLike={this.handleLike} />;
			} else {
				return null;
			}
		})

		return(
			<div className="App Container" style={{marginTop: 120}}>
				<div>{MovieCardsDiv}</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		movies: state.fetchReducer.moviesData
	}
}

function mapDispatchToProps(dispatch) {
	return {
		async fetchData() {
			const data = await getMovieData();
			return dispatch({
				type: FETCH_SUCCESS,
				payload: {
					...data
				} 
			})
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App);