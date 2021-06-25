import React, { Component } from 'react';
import { getMovies } from '../services/fakeMovieService';
import { getGenres } from '../services/fakeGenreService';
import MovieRow from './movieRow';
import Pagination from './common/pagination'
import paginate from '../utilities/paginate';
import ListGroup from './common/listGroup';
class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1,
    currentGenreId: ''
  };

  

  componentDidMount() {
    this.setState({movies: getMovies(), genres: getGenres()})
  }

  async componentDidUpdate(prevProps, prevState) {
    const {currentGenreId} = this.state

    if(currentGenreId !== prevState.currentGenreId & currentGenreId === "reset") {
      this.setState({movies: getMovies()})
      return
    }
  
    if(currentGenreId !== prevState.currentGenreId) {
      await this.setState({currentPage: 1})
      let filteredMovies = getMovies().filter(movie => movie.genre._id === currentGenreId)
      this.setState({movies:filteredMovies})
    }
  }
  

  handleDelete = (movieId) => {
    const moviesWithoutTheOneWeDeleted = this.state.movies.filter((m) => m._id !== movieId);
    this.setState({ movies: moviesWithoutTheOneWeDeleted });
  };

  handlePageChange = (pageNum) => {
    this.setState({currentPage: pageNum})
  }

  handleGenreChange = (genreId) => {
    this.setState({currentGenreId: genreId})
  }

  showPPSelectHandler = (e) => {
    
    this.setState({pageSize: +e.target.value})

  }

  render() {
    const { movies: mv, currentPage, pageSize, genres, currentGenreId } = this.state;
    if (mv.length === 0)
      return <div className="alert alert-warning">There are no movies at the moment</div>;

    const moviesPaginated = paginate(mv, currentPage, pageSize)
    

    return (
      <div className="movie"><h3 className='mb-5'>Please see our movies</h3><div className="row">
        <div className="col-3">
          <ListGroup 
        textProperty="name" 
        valueProperty="_id" 
        onHandleGenreChange={this.handleGenreChange} 
        genres={genres} 
        currentGenreId={currentGenreId}
        />
        </div>
        <div className="col">
          
          <div className="d-flex justify-content-between">
            <p>Showing {mv.length} movies in our store</p>
            
            <div>
              <label className='mr-2 '>Show per page</label>
              <select  onChange={this.showPPSelectHandler} className="form-select" aria-label="Default select example">
                <option value="4">4</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </select>
            </div>
          </div>

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

export default Movies;
