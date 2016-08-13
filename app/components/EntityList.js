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
  idProperty,
  selectedId,
  toolbarProps = {},
  redux: {
    listRecords,
    listSelectedId,
    listLoading,
    listError,
    listLimit
  },
  ...rest
}) => {

  return (<div>
    <TableToolbar
      {...{selectedId, onAddClick, onEditClick, onDeleteClick, onLimitChange, onRefresh, toolbarTitle}}
      {...toolbarProps}
      limit={listLimit}
    />
    <GlobalError globalError={listError}/>
    <BaseTable
      rows={listRecords}
      rowKey="id"
      sortingColumns={{}}
      query={''}
      tableWidth="100%"
      classNames={{
        table: {
          wrapper: 'pure-table pure-table-striped'
        }
      }}
      idProperty={idProperty}
      zebraRows={false}
      dataSource={listRecords}
      style={{height: 500}}
      selected={selectedId}
      sortInfo={null}
      loading={listLoading}
      {...rest}
    />
  </div>)
}

EntityList.propTypes = {
  toolbarTitle: React.PropTypes.string.isRequired,
}

export default EntityList

