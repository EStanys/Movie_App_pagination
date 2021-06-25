import React, { Component } from 'react';
import { getMovies } from '../services/fakeMovieService';
import { getGenres } from '../services/fakeGenreService';
import { paginate } from '../utils/paginate';
import Pagination from './common/pagination';
import ListGroup from './common/listGroup';
import MoviesTable from './moviesTable';
import { movieSort } from '../utils/sort';
class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1,
    sortColumn: { sortBy: 'title', order: 'asc' },
  };

  componentDidMount() {
    // prideti papildoma item i genres
    const genres = [{ _id: '', name: 'All genres' }, ...getGenres()];
    this.setState({ movies: getMovies(), genres: genres });
  }

  handleDelete = (movieId) => {
    // console.log('You are trying to delete, WHy ?', movieId);
    const moviesWithoutTheOneWeDeleted = this.state.movies.filter((m) => m._id !== movieId);
    this.setState({ movies: moviesWithoutTheOneWeDeleted });
  };

  handlePageChange = (pageNum) => {
    // console.log(pageNum);
    this.setState({ currentPage: pageNum });
  };

  handleGenreChange = (genre) => {
    // console.log('handleChange', genre);
    this.setState({ currentGenre: genre, currentPage: 1 });
  };

  handleSort = (sortColumnCopy) => {
    this.setState({ sortColumn: sortColumnCopy });
  };

  render() {
    const { movies: mv, currentPage, pageSize, genres, currentGenre, sortColumn } = this.state;
    if (mv.length === 0)
      return <div className="alert alert-warning">There are no movies at the moment</div>;

    const filteredMovies =
      currentGenre && currentGenre._id ? mv.filter((m) => m.genre._id === currentGenre._id) : mv;

    // sort filteredMovies, by sortColumn.sortBy
    const sortedMovies = movieSort(sortColumn, filteredMovies);

    // paduoti tik tiek movies kiek reikia pagal pagination
    const moviesPaginated = paginate(sortedMovies, currentPage, pageSize);

    return (
      <div className="movie">
        <h3 className="my-4">Please see out movies</h3>
        <div className="row">
          <div className="col-3">
            <ListGroup
              selectedItem={currentGenre}
              onItemSelect={this.handleGenreChange}
              items={genres}
            />
          </div>
          <div className="col">
            <p>Showing {moviesPaginated.length} movies in out store</p>
            <MoviesTable
              sortColumn={sortColumn}
              onSort={this.handleSort}
              moviesPaginated={moviesPaginated}
              onDelete={this.handleDelete}
            />
            <Pagination
              currentPage={currentPage}
              onPageChange={this.handlePageChange}
              itemCount={filteredMovies.length}
              pageSize={pageSize}
            />
          </div>
        </div>
        {/* <ListGroup
          items={this.state.testArr}
          textProperty="title"
          valueProperty="id"
          onItemSelect={this.handleGenreChange}
        /> */}
      </div>
    );
  }
}

export default Movies;
