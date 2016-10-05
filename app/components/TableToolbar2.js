import React from 'react'
import {Grid, Button, Icon} from 'semantic-ui-react'
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
  limit,
  onLimitChange,
  page,
  onNextPage,
  onPrevPage,
  appendButtons = []
}) => (<Grid style={{marginBottom: 5, marginTop: 5}}>
  <Grid.Column key={1} width={8}>
    <Button
      className={classNames({
        positive: true,
        icon: true,
        labeled: true,
      })}
      onClick={onAddClick}
    >
      <Icon name='add' />
      Add
    </Button>
    <Button
      className={classNames({
        icon: true,
        labeled: true,
        disabled: !selectedId
      })}
      onClick={onEditClick}
    >
      <Icon name='edit' />
      Edit
    </Button>
    <Button
      className={classNames({
        negative: true,
        icon: true,
        labeled: true,
        disabled: !selectedId
      })}
      onClick={onDeleteClick}
    >
      <Icon name='erase' />
      Delete
    </Button>
    {appendButtons && appendButtons}
  </Grid.Column>
  <Grid.Column width={2}>
    <div style={{paddingTop: 8}}>{toolbarTitle}</div>
  </Grid.Column>
  <Grid.Column width={6}>
    <TablePagination {...{page, onNextPage, onPrevPage}} />
    <Button className='basic icon' onClick={onRefresh}>
      <Icon name='repeat' size='large' />
    </Button>
    <ListLimitMenu {...{limit, onLimitChange}} />
  </Grid.Column>
</Grid>)

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
  limit: React.PropTypes.number,
  onLimitChange: React.PropTypes.func,
  page: React.PropTypes.number,
  onNextPage: React.PropTypes.func,
  onPrevPage: React.PropTypes.func,
  appendButtons: React.PropTypes.any,
}

export default TableToolbar2
