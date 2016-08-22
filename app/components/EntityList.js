import React from 'react'
import TableToolbar from 'components/TableToolbar'
import BaseTable from 'components/BaseTable'
import GlobalError from 'components/GlobalError'

const EntityList = ({
  columns,
  onAddClick,
  onEditClick,
  onDeleteClick,
  onLimitChange,
  onRefresh,
  onSelectRow,
  toolbarShow,
  toolbarTitle,
  toolbarProps = {},
  redux, // eslint-disable-line no-unused-vars
  redux: {
    listRecords,
    listSelectedId,
    listError,
    listLimit,
  }
}) => (<div>
  <If condition={toolbarShow}>
    <TableToolbar
      {...{listSelectedId, onAddClick, onEditClick, onDeleteClick, onLimitChange, onRefresh, toolbarTitle}}
      {...toolbarProps}
      limit={listLimit}
    />
  </If>
  <GlobalError globalError={listError} />
  <BaseTable
    rows={listRecords}
    selectedRowId={listSelectedId}
    columns={columns}
    onSelectRow={onSelectRow}
  />
</div>)

EntityList.propTypes = {
  columns: React.PropTypes.any.isRequired,
  redux: React.PropTypes.any.isRequired,
  onAddClick: React.PropTypes.func,
  onEditClick: React.PropTypes.func,
  onDeleteClick: React.PropTypes.func,
  onLimitChange: React.PropTypes.func,
  onRefresh: React.PropTypes.func,
  onSelectRow: React.PropTypes.func,
  toolbarTitle: React.PropTypes.string.isRequired,
  toolbarShow: React.PropTypes.bool,
  toolbarProps: React.PropTypes.any,
}

EntityList.defaultProps = {
  toolbarShow: true
}

export default EntityList

