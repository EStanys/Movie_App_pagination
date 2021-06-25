import React, { Component } from 'react';
import MovieRow from './movieRow';

class MoviesTable extends Component {
  raiseSort = (sortBy) => {
    // console.log('sortBy', sortBy);
    const sortColumnCopy = { ...this.props.sortColumn };
    if (sortColumnCopy.sortBy === sortBy) {
      sortColumnCopy.order = sortColumnCopy.order === 'asc' ? 'desc' : 'asc';
    } else {
      sortColumnCopy.sortBy = sortBy;
      sortColumnCopy.order = 'asc';
    }
    this.props.onSort(sortColumnCopy);
  };

  

  renderSortItem = (iconColumn) => {
     const { sortBy, order } = this.props.sortColumn;

     const sortIconClassName = `fa fa-sort-${order}`
    
      return sortBy === iconColumn && <i className={sortIconClassName}></i>;
    
  }
  // sort icon prie to column kuris siuo metu yra sortinamas
  render() {
    const { moviesPaginated, onDelete} = this.props;

    return (
      <table className="table table-striped ">
        <thead>
          <tr>
            <th onClick={() => this.raiseSort('title')}>
              Title {this.renderSortItem('title')} 
            </th>
            <th onClick={() => this.raiseSort('genre.name')}>
              Genre {this.renderSortItem('genre.name')}
            </th>
            <th onClick={() => this.raiseSort('numberInStock')}>
              Stock {this.renderSortItem('numberInStock')}
            </th>
            <th onClick={() => this.raiseSort('dailyRentalRate')}>
              Rating {this.renderSortItem('dailyRentalRate')}
            </th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {moviesPaginated.map((movie) => (
            <MovieRow onDelete={onDelete} movie={movie} key={movie._id} />
          ))}
        </tbody>
      </table>
    );
  }
}

export default MoviesTable;
