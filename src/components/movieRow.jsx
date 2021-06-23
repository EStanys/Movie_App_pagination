import React, { Component } from 'react';

class MovieRow extends Component {
  state = {};
  render() {
    console.log('this.props', this.props);
    const { movie } = this.props;
    return (
      <tr>
        <td>{movie.title}</td>
        <td>{movie.genre.name}</td>
        <td>{movie.numberInStock}</td>
        <td>{movie.dailyRentalRate}</td>
        <td>
          <button onClick={() => this.props.onDelete(movie._id)} className="btn btn-danger btn-sm">
            Delete
          </button>
        </td>
      </tr>
    );
  }
}

export default MovieRow;
