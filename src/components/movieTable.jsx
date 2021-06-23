import React, { Component } from 'react';
import { getMovies } from '../services/fakeMovieService';
import { getGenres } from '../services/fakeGenreService';
import MovieRow from './movieRow';
import Pagination from './common/pagination'
import paginate from '../utilities/paginate';
import ListGroup from './common/listGroup';
class MovieTable extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1,
    currentGenre: ''
  };

  

  componentDidMount() {
    this.setState({movies: getMovies(), genres: getGenres()})
  }

  async componentDidUpdate(prevProps, prevState) {
    const {currentGenre} = this.state

    if(currentGenre !== prevState.currentGenre & currentGenre === "reset") {
      this.setState({movies: getMovies()})
      return
    }
  
    if(currentGenre !== prevState.currentGenre) {
      await this.setState({movies: getMovies()})
      let filteredMovies = this.state.movies.filter(movie => movie.genre.name === currentGenre)
      this.setState({movies:filteredMovies})
    }
  }
  

  handleDelete = (movieId) => {
    console.log('You are trying to delete, WHy ?', movieId);
    const moviesWithoutTheOneWeDeleted = this.state.movies.filter((m) => m._id !== movieId);
    this.setState({ movies: moviesWithoutTheOneWeDeleted });
  };

  handlePageChange = (pageNum) => {
    this.setState({currentPage: pageNum})
  }

  handleGenreChange = (genreName) => {
    this.setState({currentGenre: genreName})
  }

  render() {
    const { movies: mv, currentPage, pageSize, genres, currentGenre } = this.state;
    if (mv.length === 0)
      return <div className="alert alert-warning">There are no movies at the moment</div>;

    const moviesPaginated = paginate(mv, currentPage, pageSize)
    

    return (
      <div className="movie"><h3 className='mb-5'>Please see out movies</h3><div className="row">
        <div className="col-3"><ListGroup onHandleGenreChange={this.handleGenreChange} genres={genres} currentGenre={currentGenre}/></div>
        <div className="col">
          
          <p>Showing {mv.length} movies in out store</p>
          <table className="table table-striped ">
          <thead>
            <tr>
              <th>Title</th>
              <th>Genre</th>
              <th>Stock</th>
              <th>Rating</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {moviesPaginated.map((movie) => (
              <MovieRow onDelete={this.handleDelete} movie={movie} key={movie._id} />
            ))}
          </tbody>
        </table>
        <Pagination 
          currentPage={currentPage} 
          onHandlePageChange={this.handlePageChange} 
          itemCount={mv.length} 
          pageSize={pageSize}/>
          </div>
      </div></div>
      
    );
  }
  
}

export default MovieTable;
