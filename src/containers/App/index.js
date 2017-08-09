import React from 'react'
import { connect } from 'react-redux'
import { getMovieData } from '../../actions/movieData'
import { FETCH_SUCCESS } from '../../constants/actionTypes'
import { RATE_LOW_HIGH, RATE_HIGH_LOW, POP_LOW_HIGH, POP_HIGH_LOW }  from '../../constants/actionTypes'
import MovieCard from '../../components/MovieCard'
import Select from 'react-select'
import _ from 'lodash'

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
	      sortSelectValue: {value: null, label: null},
	      yearSelectValue: {value: null, label: null}
	    }
	}

	handleLike() {

	}

	logSortSelectChange(sortSelectValue) {
		let filteredMovieData;

		switch(sortSelectValue.value) {
		  case 'rl':
		  	this.props.sortByData({
		  		type: RATE_LOW_HIGH
		  	})
		    break;
		  case 'rh':
		  	this.props.sortByData({
		  		type: RATE_HIGH_LOW
		  	})
		    break;
		  case 'pl':
		  	this.props.sortByData({
		  		type: POP_LOW_HIGH
		  	})
		    break;
		  case 'ph':
		  	this.props.sortByData({
		  		type: POP_HIGH_LOW
		  	})
		    break;
		  default:
		    filteredMovieData = this.props.movies
		}

		this.setState({
		  sortSelectValue,
		  filteredMovieData: filteredMovieData,
		  filteredView: true
		})
	}

	logYearSelectChange(yearSelectValue) {
	let filteredMovieData;

	if (yearSelectValue !== null) {
	  filteredMovieData = _.filter(this.props.movies, function(o) {
	    let releaseDate = new Date(o.release_date)
	    return yearSelectValue.value === releaseDate.getFullYear()
	  })

	  this.setState({
	    yearSelectValue,
	    filteredMovieData: filteredMovieData,
	    filteredView: true
	  })
	} else {
	  this.setState({
	    filteredView: false        
	  })
	}
	}

	componentDidMount() {
		this.props.fetchData()
	}

	render() {

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

		let MovieCardsDiv = this.props.movies? (this.props.movies.map(data => {
			if (data !== null) {
				return <MovieCard key={data.id} data={data} handleLike={this.handleLike} />;
			} else {
				return null;
			}
		})):null;

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
		sortedMovies: state.sortReducer.sortedMovies,
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
		sortByData({type}) {
			return dispatch({
				type,
				payload: {
					...this.movies.results
				}

			})
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App);