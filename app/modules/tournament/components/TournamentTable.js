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
  onRowSelection,
  listLoading,
  listError,
  selectedId,
  ...rest
}) => {

  return <div>
    <TableToolbar
      onAddClick={onAddClick}
      onEditClick={onEditClick}
      onDeleteClick={onDeleteClick}
      onLimitChange={onLimitChange}
      onRefresh={onRefresh}
      title={toolbarTitle}
      limit={limit}
    />
    <DataGrid
      idProperty="id"
      zebraRows={false}
      style={{height: 500}}
      selected={selectedId}
      loading={listLoading}
      onSelectionChange={onRowSelection}
      {...rest}
    />
  </div>
};

TournamentTable.defaultProps = {
  onRowSelection: () => {},
  data: []
};

TournamentTable.propTypes = {
  onRowSelection: React.PropTypes.func,
  onAddClick: React.PropTypes.func,
  onEditClick: React.PropTypes.func,
  onDeleteClick: React.PropTypes.func,
  onLimitChange: React.PropTypes.func,
  onRefresh: React.PropTypes.func,
  limit: React.PropTypes.number,
  toolbarTitle: React.PropTypes.string.isRequired,
  dataSource: React.PropTypes.array,
  columns: React.PropTypes.arrayOf(React.PropTypes.shape({
    name: React.PropTypes.string.isRequired,
    title: React.PropTypes.string.isRequired
  }))
};

export default TournamentTable;

