import React from 'react'
import {Grid, Button, Icon, Container, Segment, Menu, Dropdown} from 'semantic-ui-react'
import TablePagination from 'components/TablePagination'
import ListLimitMenu from 'components/ListLimitMenu'
import classNames from 'classnames'

const TableToolbar2 = ({
  toolbarTitle,
  selectedId,
  onAddClick,
  onEditClick,
  onDeleteClick,
  onRefresh,
  loading,
  limit,
  onLimitChange,
  page,
  onNextPage,
  onPrevPage,
  appendButtons = []
}) => (<Menu>

  <Menu.Menu position='left' icon='labeled'>
    <Menu.Item icon='add' content='Add' onClick={onAddClick} />
    <Menu.Item icon='edit' content='Edit' onClick={onEditClick} />
    <Menu.Item icon='erase' content='Erase' onClick={onDeleteClick} />
    <Menu.Item icon='Search' content='search' onClick={onDeleteClick} />
  </Menu.Menu>

  <Menu.Menu position='right'>
    <Dropdown as={Menu.Item} icon='toggle down'>
      <Dropdown.Menu>
        <Dropdown.Item>2</Dropdown.Item>
        <Dropdown.Item>10</Dropdown.Item>
        <Dropdown.Item>50</Dropdown.Item>
        <Dropdown.Item>500</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
    <Menu.Item icon='angle left' onClick={onPrevPage} />
    <Menu.Item name={`Page: ${page}`} />
    <Menu.Item icon='angle right' onClick={onNextPage} />
    <Menu.Item icon='repeat' onClick={onRefresh} />
    <Menu.Item header>Competitors</Menu.Item>
  </Menu.Menu>

</Menu>)

TableToolbar2.defaultProps = {
  onAddClick: () => null,
  onEditClick: () => null,
  onDeleteClick: () => null,
  onLimitChange: () => null,
  toolbarTitle: 'List',
}

TableToolbar2.propTypes = {
  toolbarTitle: React.PropTypes.string,
  selectedId: React.PropTypes.number,
  onAddClick: React.PropTypes.func,
  onEditClick: React.PropTypes.func,
  onDeleteClick: React.PropTypes.func,
  onRefresh: React.PropTypes.func,
  loading: React.PropTypes.bool,
  limit: React.PropTypes.number,
  onLimitChange: React.PropTypes.func,
  page: React.PropTypes.number,
  onNextPage: React.PropTypes.func,
  onPrevPage: React.PropTypes.func,
  appendButtons: React.PropTypes.any,
}

export default TableToolbar2
