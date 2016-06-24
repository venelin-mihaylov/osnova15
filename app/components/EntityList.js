"use strict"
import React from "react"
import TableToolbar from "components/TableToolbar"
import DataGrid from 'react-datagrid'
import GlobalError from 'components/GlobalError'

const EntityList = ({
  onAddClick,
  onEditClick,
  onDeleteClick,
  onLimitChange,
  onRefresh,
  toolbarTitle,
  selectedId,
  redux: {
    listRecords,
    listLoading,
    listError,
    listLimit
  },
  ...rest
}) => {

  return (<div>
    <TableToolbar
      {...{onAddClick, onEditClick, onDeleteClick, onLimitChange, onRefresh, toolbarTitle}}
      limit={listLimit}
    />
    <GlobalError globalError={listError}/>
    <DataGrid
      idProperty="id"
      zebraRows={false}
      dataSource={listRecords}
      style={{height: 500}}
      selected={selectedId}
      loading={listLoading}
      {...rest}
    />
  </div>)
}

EntityList.propTypes = {
  toolbarTitle: React.PropTypes.string.isRequired,
}

export default EntityList

