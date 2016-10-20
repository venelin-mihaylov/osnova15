import React from 'react'
import {Grid, Button, Icon, Container} from 'semantic-ui-react'
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
}) => (<Grid style={{marginBottom: 5, marginTop: 5}} divided>
  <Grid.Column key={1} width={9}>
    <Button
      positive
      icon='add'
      content='Add'
      size='large'
      onClick={onAddClick}
    />
    <Button
      icon='edit'
      content='Edit'
      size='large'
      color='yellow'
      disabled={!selectedId}
      onClick={onEditClick}
    />
    <Button
      negative
      icon='erase'
      content='Delete'
      size='large'
      disabled={!selectedId}
      onClick={onDeleteClick}
    />
    {appendButtons && appendButtons}
  </Grid.Column>
  <Grid.Column width={7}>
    <TablePagination {...{page, onNextPage, onPrevPage}} />
    <Button
      basic
      loading={loading}
      icon={<Icon name='repeat' size='large' />}
      onClick={onRefresh}
    />
    <ListLimitMenu {...{limit, onLimitChange}} />
    <h2
      style={{
        display: 'inline-block',
        marginLeft: 20,
        marginTop: 0,
        marginBottom: 0,
        padding: 0,
        verticalAlign: 'middle',
        lineHeight: 'normal'
      }}
    >{toolbarTitle}</h2>
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
  loading: React.PropTypes.bool,
  limit: React.PropTypes.number,
  onLimitChange: React.PropTypes.func,
  page: React.PropTypes.number,
  onNextPage: React.PropTypes.func,
  onPrevPage: React.PropTypes.func,
  appendButtons: React.PropTypes.any,
}

export default TableToolbar2
