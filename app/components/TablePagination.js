import React from 'react'
import {Menu, Dropdown} from 'semantic-ui-react'

// const TablePagination = ({page, onPrevPage, onNextPage}) => (<div className='ui pagination menu' style={{marginRight: 5, marginLeft: 5}}>
//   <a className='icon item' onClick={onPrevPage}>
//     <i className='left chevron icon'></i>
//   </a>
//   <div className='item'>
//     Page: {page}
//   </div>
//   <a className='icon item' onClick={onNextPage}>
//     <i className='right chevron icon'></i>
//   </a>
// </div>)

const TablePagination = ({page, onPrevPage, onNextPage}) => (<Menu>


</Menu>)

TablePagination.propTypes = {
  onPrevPage: React.PropTypes.func,
  onNextPage: React.PropTypes.func,
  page: React.PropTypes.number
}

export default TablePagination
