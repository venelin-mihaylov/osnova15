import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import Toolbar from 'material-ui/Toolbar/Toolbar'
import ToolbarGroup from 'material-ui/Toolbar/ToolbarGroup'
import ToolbarTitle from 'material-ui/Toolbar/ToolbarTitle'
import FontIcon from 'material-ui/FontIcon'
import TablePagination from 'components/TablePagination'

class TableToolbar extends React.Component {

  static defaultProps = {
    onAddClick: () => {},
    onEditClick: () => {},
    onDeleteClick: () => {},
    onLimitChange: () => {},
    limit: 100,
    toolbarTitle: 'List',
  }

  static propTypes = {
    onAddClick: React.PropTypes.func,
    onEditClick: React.PropTypes.func,
    onDeleteClick: React.PropTypes.func,
    onLimitChange: React.PropTypes.func,
    onRefresh: React.PropTypes.func,
    limit: React.PropTypes.number,
    toolbarTitle: React.PropTypes.string,
    appendButtons: React.PropTypes.any,
    selectedId: React.PropTypes.number
  }

  render() {
    const {
      toolbarTitle,
      onAddClick,
      onEditClick,
      onDeleteClick,
      limit,
      onLimitChange,
      selectedId,
      onRefresh,
      appendButtons = []
    } = this.props

    return (
      <Toolbar>
        <ToolbarGroup firstChild float='left'>
          <RaisedButton
            label='add'
            primary
            onClick={onAddClick}
            icon={<FontIcon className='fa fa-plus' />}
          />
          <RaisedButton
            label='edit'
            primary
            onClick={onEditClick}
            disabled={!selectedId}
            icon={<FontIcon className='fa fa-pencil' />}
          />
          <RaisedButton
            label='delete'
            secondary
            onClick={onDeleteClick}
            disabled={!selectedId}
            icon={<FontIcon className='fa fa-trash' />}
          />
          {appendButtons.length && appendButtons}
        </ToolbarGroup>
        <ToolbarGroup float='right'>
          <ToolbarTitle text={toolbarTitle} />
          <FontIcon className='fa fa-refresh fa-3x' onClick={onRefresh} style={{marginRight: 20}} />
          <limitMenu
            onLimitChange={onLimitChange}
            limit={limit}
          />
        </ToolbarGroup>
      </Toolbar>
    )
  }
}

export default TableToolbar
