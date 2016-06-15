"use strict";
import React from "react";
import {autobind} from "core-decorators";
import {push} from "react-router-redux";

@autobind
export default class CRUDTableContainer extends React.Component {

  

  

  onAddClick() {
  }

  onEditClick() {
    this.props.dispatch();
  }

  onDeleteClick() {
    let record = this.getFirstSelectedRecord();
    if (!record) return;

    this.props.dispatch(this.action.deleteRecord(record.id));
  }

  onLimitChange(event, limit) {
    this.props.dispatch(this.action.setListLimit(limit));
  }

  
}
