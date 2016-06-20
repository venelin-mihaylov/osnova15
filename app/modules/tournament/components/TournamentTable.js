"use strict";
import React from "react";
import Table from "material-ui/Table/Table";
import TableHeaderColumn from "material-ui/Table/TableHeaderColumn";
import TableRow from "material-ui/Table/TableRow";
import TableHeader from "material-ui/Table/TableHeader";
import TableFooter from "material-ui/Table/TableFooter";
import TableRowColumn from "material-ui/Table/TableRowColumn";
import TableBody from "material-ui/Table/TableBody";
import TableToolbar from "components/TableToolbar";
import Loading from 'components/Loading';
import GlobalError from 'components/GlobalError';

const TournamentTable = ({
  onAddClick,
  onEditClick,
  onDeleteClick,
  onLimitChange,
  onRefresh,
  toolbarTitle,
  limit,
  onRowSelection,
  columns,
  data,
  listLoading,
  listError
}) => (
  <div>
    <Loading loading={listLoading}/>
    <GlobalError globalError={listError}/>
    <TableToolbar
      onAddClick={onAddClick}
      onEditClick={onEditClick}
      onDeleteClick={onDeleteClick}
      onLimitChange={onLimitChange}
      onRefresh={onRefresh}
      title={toolbarTitle}
      limit={limit}
    />
    <Table
      height="500px"
      fixedHeader={true}
      fixedFooter={true}
      selectable={true}
      multiSelectable={false}
      stripedRows={true}
      onRowSelection={onRowSelection}
    >
      <TableHeader adjustForCheckbox={true}>
        <TableRow>
          {columns.map((column, index) => (
            <TableHeaderColumn key={column.name}>{column.label}</TableHeaderColumn>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody
        displayRowCheckbox={true}
        deselectOnClickaway={false}
        showRowHover={true}
        stripedRows={true}
      >
        {data.map((row, index) => (
          <TableRow key={row.id} selected={row.selected}>
                    {columns.map((column, index) => (
                      <TableRowColumn key={column.name}>{row[column.name]}</TableRowColumn>
                    ))}
          </TableRow>
        ))}
      </TableBody>
      <TableFooter adjustForCheckbox={true}>
        <TableRow>
          {columns.map((column, index) => (
            <TableRowColumn key={column.name}>{column.label}</TableRowColumn>
          ))}
        </TableRow>
      </TableFooter>
    </Table>
  </div>
);

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
  data: React.PropTypes.array,
  columns: React.PropTypes.arrayOf(React.PropTypes.shape({
    name: React.PropTypes.string.isRequired,
    label: React.PropTypes.string.isRequired
  }))
};

export default TournamentTable;

