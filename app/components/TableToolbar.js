"use strict";
import React from "react";
import RaisedButton from "material-ui/RaisedButton";
import Toolbar from "material-ui/Toolbar/Toolbar";
import ToolbarGroup from "material-ui/Toolbar/ToolbarGroup";
import ToolbarTitle from "material-ui/Toolbar/ToolbarTitle";
import ListLimitMenu from "components/ListLimitMenu";
import FontIcon from "material-ui/FontIcon";

class TableToolbar extends React.Component {

  static defaultProps = {
    onAddClick: () => {},
    onEditClick: () => {},
    onDeleteClick: () => {},
    onLimitChange: () => {},
    title: "List"
  };

  static propTypes = {
    onAddClick: React.PropTypes.func,
    onEditClick: React.PropTypes.func,
    onDeleteClick: React.PropTypes.func,
    onLimitChange: React.PropTypes.func,
    limit: React.PropTypes.number,
    title: React.PropTypes.string
  };

  render() {
    return (
      <Toolbar>
        <ToolbarGroup firstChild={true} float="left">
          <RaisedButton
            label="add"
            primary={true}
            onClick={this.props.onAddClick}
            icon={<FontIcon className="fa fa-plus"/>}
          />
          <RaisedButton
            label="edit"
            primary={true}
            onClick={this.props.onEditClick}
            icon={<FontIcon className="fa fa-pencil"/>}
          />
          <RaisedButton
            label="delete"
            secondary={true}
            onClick={this.props.onDeleteClick}
            icon={<FontIcon className="fa fa-trash"/>}
          />
        </ToolbarGroup>
        <ToolbarGroup float="right">
          <ToolbarTitle text={this.props.title}/>
          <ListLimitMenu
            onLimitChange={this.props.onLimitChange}
            limit={this.props.limit}
          />
        </ToolbarGroup>
      </Toolbar>
    )
  }
}

export default TableToolbar;
