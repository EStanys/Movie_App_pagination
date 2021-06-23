import React, { Component } from 'react';
import { getMovies } from '../services/fakeMovieService';
import MovieRow from './movieRow';
class MovieTable extends Component {
  state = {
    movies: getMovies(),
  };

  render() {
    const { movies: mv } = this.state;
    if (mv.length === 0)
      return <div className="alert alert-warning">There are no movies at the moment</div>;

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
            {this.state.movies.map((movie) => (
              <MovieRow onDelete={this.handleDelete} movie={movie} key={movie._id} />
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  handleDelete = (movieId) => {
    console.log('You are trying to delete, WHy ?', movieId);
    const moviesWithoutTheOneWeDeleted = this.state.movies.filter((m) => m._id !== movieId);
    this.setState({ movies: moviesWithoutTheOneWeDeleted });
  };
}

export default MovieTable;
