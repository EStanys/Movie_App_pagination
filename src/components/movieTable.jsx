import React, { Component } from 'react';
import { getMovies } from '../services/fakeMovieService';
import MovieRow from './movieRow';
import Pagination from './common/pagination'
import paginate from '../utilities/paginate';
class MovieTable extends Component {
  state = {
    movies: getMovies(),
    pageSize: 4,
    currentPage: 1
  };

  handleDelete = (movieId) => {
    console.log('You are trying to delete, WHy ?', movieId);
    const moviesWithoutTheOneWeDeleted = this.state.movies.filter((m) => m._id !== movieId);
    this.setState({ movies: moviesWithoutTheOneWeDeleted });
  };

  handlePageChange = (pageNum) => {
    this.setState({currentPage: pageNum})
  }

  render() {
    const { movies: mv, currentPage, pageSize } = this.state;
    if (mv.length === 0)
      return <div className="alert alert-warning">There are no movies at the moment</div>;

    const moviesPaginated = paginate(mv, currentPage, pageSize)
    

    return (
      <div>
        <h3>Please see out movies</h3>
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
    );
  }
  
}

export default MovieTable;
