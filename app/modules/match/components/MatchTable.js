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

class MatchTable extends React.Component {

  static defaultProps = {
    onSelectionChange: () => {},
    data: []
  };

  static propTypes = {
    onSelectionChange: React.PropTypes.func,
    onAddClick: React.PropTypes.func,
    onEditClick: React.PropTypes.func,
    onDeleteClick: React.PropTypes.func,
    onLimitChange: React.PropTypes.func,
    limit: React.PropTypes.number,
    toolbarTitle: React.PropTypes.string.isRequired,
    data: React.PropTypes.array,
    columns: React.PropTypes.arrayOf(React.PropTypes.shape({
      name: React.PropTypes.string.isRequired,
      label: React.PropTypes.string.isRequired
    }))
  };

  render() {
    return (
      <div>
        <TableToolbar
          onAddClick={this.props.onAddClick}
          onEditClick={this.props.onEditClick}
          onDeleteClick={this.props.onDeleteClick}
          onLimitChange={this.props.onLimitChange}
          title={this.props.toolbarTitle}
          limit={this.props.limit}
        />
        <Table
          height="500px"
          fixedHeader={true}
          fixedFooter={true}
          selectable={true}
          multiSelectable={false}
          stripedRows={true}
          onSelectionChange={this.props.onSelectionChange}
        >
          <TableHeader adjustForCheckbox={true}>
            <TableRow>
              {this.props.columns.map((column, index) => (
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
            {this.props.data.map((row, index) => (
              <TableRow key={row.id} selected={row.selected}>
                {this.props.columns.map((column, index) => (
                  <TableRowColumn key={column.name}>{row[column.name]}</TableRowColumn>
                ))}
              </TableRow>
            ))}
          </TableBody>
          <TableFooter adjustForCheckbox={true}>
            <TableRow>
              {this.props.columns.map((column, index) => (
                <TableRowColumn key={column.name}>{column.label}</TableRowColumn>
              ))}
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    )
  }
}
export default MatchTable;

