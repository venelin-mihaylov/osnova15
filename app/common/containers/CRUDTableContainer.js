"use strict";
import React from "react";
import {autobind} from "core-decorators";
import {push} from "react-router-redux";

@autobind
export default class CRUDTableContainer extends React.Component {

  action = null;

  state = {
    selection: []
  };

  getFirstSelectedRecord() {
    if (!this.state.selection.length) return null;

    let idx = this.state.selection[0];
    let data = this.data.records.value();
    return data[idx];
  }

  onAddClick() {
    this.props.dispatch(push(`/${this.action.dbTable}/add`));
  }

  onEditClick() {
    let record = this.getFirstSelectedRecord();
    if (!record) return;

    this.props.dispatch(push(`/${this.action.dbTable}/edit/${record.id}`));
  }

  onDeleteClick() {
    let record = this.getFirstSelectedRecord();
    if (!record) return;

    this.props.dispatch(this.action.deleteRecord(record.id));
  }

  onLimitChange(event, limit) {
    this.props.dispatch(this.action.setListLimit(limit));
  }

  onRowSelection(selection) {
    this.state.selection = selection;
  }
}
