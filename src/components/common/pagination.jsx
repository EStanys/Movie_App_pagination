
import PropTypes from 'prop-types'

export default function Pagination(props) {
  const { itemCount, pageSize, onHandlePageChange, currentPage } = props

  const pageCount = Math.ceil(itemCount/pageSize)
  if (pageCount === 1) return null


  const pages = () => {
    const arr = []
    for (let i = 1; i <= pageCount; i++) {
      arr.push(i)
    }
       return arr
  }
 

  return (
    <nav>
      <ul className="pagination">
        {pages().map(pageNum => 
          <li key={pageNum} className={"page-item " + (currentPage === pageNum && " active") } >
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <a onClick={ ()=>{onHandlePageChange(pageNum)} }  className='page-link'>{pageNum}</a>
          </li>)}
      </ul>
    </nav>
  )
}

Pagination.propTypes = {
  itemCount: PropTypes.number.isRequired, 
  pageSize: PropTypes.number.isRequired, 
  onHandlePageChange: PropTypes.func.isRequired, 
  currentPage: PropTypes.number.isRequired, 
}
