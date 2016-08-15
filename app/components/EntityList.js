"use strict"
import React from "react"
import TableToolbar from "components/TableToolbar"
import BaseTable from 'components/BaseTable'
import GlobalError from 'components/GlobalError'

const EntityList = ({
  onAddClick,
  onEditClick,
  onDeleteClick,
  onLimitChange,
  onRefresh,
  toolbarTitle,
  toolbarProps = {},
  redux,
  redux: {
    listRecords,
    listSelectedId,
    listSelectedRecord,
    listLoading,
    listError,
    listLimit
  },
  ...rest
}) => {

  return (<div>
    <TableToolbar
      {...{listSelectedId, onAddClick, onEditClick, onDeleteClick, onLimitChange, onRefresh, toolbarTitle}}
      {...toolbarProps}
      limit={listLimit}
    />
    <GlobalError globalError={listError}/>
    <BaseTable
      rows={listRecords}
      selectedRowId={listSelectedId}
      selectedRow={listSelectedRecord}
      rowKey="id"
      {...rest}
    />
  </div>)
}

EntityList.propTypes = {
  toolbarTitle: React.PropTypes.string.isRequired,
}

export default EntityList

