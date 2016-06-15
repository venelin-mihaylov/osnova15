"use strict";
import React from "react";
import {autobind} from "core-decorators";
import {actions} from "react-redux-form";
import {formModel} from "utils/Util";

@autobind
class CRUDAddContainer extends React.Component {

  action = null;

  componentWillMount() {
    this.props.dispatch(actions.reset(formModel('tournament')));
  }

  onSubmit(record) {
    this.props.dispatch();
  }

}

export default CRUDAddContainer;

