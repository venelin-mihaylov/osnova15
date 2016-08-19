import React from 'react'
import TableToolbar from 'components/TableToolbar'
import BaseTable from 'components/BaseTable'
import GlobalError from 'components/GlobalError'

const EntityList = ({
  onAddClick,
  onEditClick,
  onDeleteClick,
  onLimitChange,
  onRefresh,
  toolbarShow,
  toolbarTitle,
  toolbarProps = {},
  redux,
  redux: {
    listRecords,
    listSelectedId,
    listSelectedRecord,
    listError,
    listLimit,
  },
  ...rest,
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
    selectedRow={listSelectedRecord}
    rowKey='id'
    {...rest}
  />
</div>)

EntityList.propTypes = {
  toolbarTitle: React.PropTypes.string.isRequired,
  toolbarShow: React.PropTypes.bool
}

EntityList.defaultProps = {
  toolbarShow: true
}

export default EntityList

