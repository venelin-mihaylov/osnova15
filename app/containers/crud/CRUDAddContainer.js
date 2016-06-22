"use strict";
import React from "react";
import {autobind} from "core-decorators";

@autobind
class CRUDAddContainer extends React.Component {

  action = null;

  onSubmit(record) {
    this.props.dispatch();
  }

}

export default CRUDAddContainer;

