"use strict";
import React from "react";
import {autobind} from "core-decorators";
import {actions} from "react-redux-form";
import {formModel} from "util/Util";


@autobind
class CRUDAddContainer extends React.Component {

  action = null;

  componentWillMount() {
    this.props.dispatch(actions.reset(formModel(this.action.dbTable)));
  }

  onSubmit(record) {
    this.props.dispatch(this.action.createRecord(record));
  }

}

export default CRUDAddContainer;

