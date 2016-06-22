"use strict";
import React from "react";
import TableToolbar from "components/TableToolbar";
import DataGrid from 'react-datagrid';

const TournamentTable = ({
  onAddClick,
  onEditClick,
  onDeleteClick,
  onLimitChange,
  onRefresh,
  toolbarTitle,
  limit,
  listLoading,
  listError,
  selectedId,
  ...rest
}) => {

  return <div>
    <TableToolbar
      {...{onAddClick, onEditClick, onDeleteClick, onLimitChange, onRefresh, limit}}
      title={toolbarTitle}
    />
    <DataGrid
      idProperty="id"
      zebraRows={false}
      style={{height: 500}}
      selected={selectedId}
      loading={listLoading}
      {...rest}
    />
  </div>
};

TournamentTable.propTypes = {
  toolbarTitle: React.PropTypes.string.isRequired,
};

export default TournamentTable;

