export const getMovieData = (pageNo=1) => {
	return fetch(`https://api.themoviedb.org/3/movie/popular?api_key=f54c6cba706b27a69fb42891c0161325&language=en-US&page=${pageNo}`)
  		.then(response => response.json())
	  	.then(result => result);
}