import React from 'react'

const TablePagination = ({page, onPrevPage, onNextPage}) => (<div className='ui pagination menu'>
  <a className='icon item' onClick={onPrevPage}>
    <i className='left chevron icon'></i>
  </a>
  <div className='item'>
    Page: {page}
  </div>
  <a className='icon item' onClick={onNextPage}>
    <i className='right chevron icon'></i>
  </a>
</div>)

TablePagination.propTypes = {
  onPrevPage: React.PropTypes.func,
  onNextPage: React.PropTypes.func,
  page: React.PropTypes.number
}

export default TablePagination
