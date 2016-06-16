"use strict";
import React from "react";
import {autobind} from "core-decorators";

@autobind
class CRUDEditContainer extends React.Component {

  static propTypes = {
    params: React.PropTypes.shape({
      id: React.PropTypes.string.isRequired
    })
  };

  check() {
    if (this.props.redux.loading) {
      return <p>Loading...</p>;
    }
    if (this.props.redux.saving) {
      return <p>Saving...</p>;
    }

    if (this.props.redux.globalError) {
      return <p>Global error: {this.props.redux.globalError}</p>;
    }

    if (!this.props.redux.record) {
      return <p>Loading...</p>;
    }

    return null;
  }
}
export default CRUDEditContainer;
