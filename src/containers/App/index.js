import React from 'react'
import { connect } from 'react-redux'
import { getMovieData } from '../../actions/movieData'
import { FETCH_SUCCESS } from '../../constants/actionTypes'
import { RATE_LOW_HIGH, RATE_HIGH_LOW, POP_LOW_HIGH, POP_HIGH_LOW, SORT_YEAR, UNSORT }  from '../../constants/actionTypes'
import MovieCard from '../../components/MovieCard'
import Select from 'react-select'

class App extends React.Component {
	constructor(props) {
		super(props);
		this.handleLike = this.handleLike.bind(this)
	    
		this.logSortSelectChange = this.logSortSelectChange.bind(this)
		this.logYearSelectChange = this.logYearSelectChange.bind(this)
	    this.state = {
	      movieData: [],
	      filteredMovieData: [],
	      filteredView: false,
	      sortSelectValue: null,
	      yearSelectValue: null
	    }
	}

	handleLike() {

	}

	logSortSelectChange(sortSelectValue) {
		let filteredMovieData;

		if (sortSelectValue != null) {
			switch(sortSelectValue.value) {
			  case 'rl':
			  	this.props.sortByData({
			  		type: RATE_LOW_HIGH,
			  		payload: {
			  			...this.props.movies
			  		}
			  	})
			    break;
			  case 'rh':
			  	this.props.sortByData({
			  		type: RATE_HIGH_LOW,
			  		payload: {
			  			...this.props.movies
			  		}
			  	})
			    break;
			  case 'pl':
			  	this.props.sortByData({
			  		type: POP_LOW_HIGH,
			  		payload: {
			  			...this.props.movies
			  		}
			  	})
			    break;
			  case 'ph':
			  	this.props.sortByData({
			  		type: POP_HIGH_LOW,
			  		payload: {
			  			...this.props.movies
			  		}
			  	})
			    break;
			  default:
			    filteredMovieData = this.props.movies
			}
		} else {
			filteredMovieData = []
		  	this.props.sortByData({
	  			type: UNSORT,
	  			payload: {
		  			...this.props.movies
		  		}
		  	})

		}

		this.setState({
		  sortSelectValue,
		  yearSelectValue: null,
		  filteredMovieData: filteredMovieData,
		  filteredView: true
		})
	}

	logYearSelectChange(yearSelectValue) {
		let filteredMovieData;

		if (yearSelectValue != null) {
			this.props.sortByYear({
				type: SORT_YEAR,
				year: yearSelectValue,
				payload: {
					...this.props.movies
				}
			})			
		} else {
			this.props.sortByYear({
				type: UNSORT,
				year: yearSelectValue,
				payload: {
					...this.props.movies
				}
			})	
		}

		this.setState({
			yearSelectValue,
			sortSelectValue: null,
			filteredMovieData
		})

	}

	componentDidMount() {
		this.props.fetchData()
	}

	render() {

		let MovieCardsDiv;

		const options = [
			{ value: 'rl', label: 'Rating: Low' },
			{ value: 'rh', label: 'Rating: High'},
			{ value: 'pl', label: 'Popularity: Low'},
			{ value: 'ph', label: 'Popularity: High'}
		];

		const optionYears = [
			{ value: 2014, label: '2014'},
			{ value: 2015, label: '2015'},
			{ value: 2016, label: '2016'},
			{ value: 2017, label: '2017'}
		];

		if (this.props.sortedMovies.type !== UNSORT) {
			MovieCardsDiv = this.props.sortedMovies.payload? (this.props.sortedMovies.payload.map(data => {
								if (data !== null) {
									return <MovieCard key={data.id} data={data} handleLike={this.handleLike} />;
								} else {
									return null;
								}
							})):null;
		} else {
			MovieCardsDiv = this.props.movies? (this.props.movies.map(data => {
								if (data !== null) {
									return <MovieCard key={data.id} data={data} handleLike={this.handleLike} />;
								} else {
									return null;
								}
							})):null;			
		}




		return(
			<div className="App Container" style={{marginTop: 120}}>
	          <div className="selectContainer" style={{marginBottom: 17}}>
	            <div className="sortSelect">
	              <Select
	                options={options}
	                onChange={this.logSortSelectChange}
	                placeholder="Sort by"
	                value={this.state.sortSelectValue}
	              />
	            </div>
	            <div className="yearSelect">
	              <Select
	                options={optionYears}
	                onChange={this.logYearSelectChange}
	                placeholder="Year"
	                value={this.state.yearSelectValue}
	              />
	            </div>
	          </div>
				<div className="movieContainer">
					{MovieCardsDiv}
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		movies: state.fetchReducer.moviesData,
		sortedMovies: {
			type: state.sortReducer.type,
			payload: state.sortReducer.sortedMovies
		}
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
		},
		sortByData({type, payload}) {
			return dispatch({
				type,
				payload: {
					...payload
				}

			})
		},
		sortByYear({type, year, payload}) {
			return dispatch({
				type: type,
				year,
				payload: {
					...payload
				}
			})
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App);