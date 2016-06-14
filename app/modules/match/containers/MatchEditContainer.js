"use strict";
import React from "react";
import {connect} from "react-redux";
import {autobind} from "core-decorators";
import CRUDAction2 from "actions/base/CRUDAction2";
import MatchEdit from "MatchEdit.js";
import CRUDEditContainer from "modules/common/containers/CRUDEditContainer";
import {DefaultSession as RethinkSession} from "react-rethinkdb";

@connect(state => ({redux: state.match}))
@autobind
class MatchEditContainer extends CRUDEditContainer {

  action = new CRUDAction2({dbTable: 'match', rethinkSession: RethinkSession});

  render() {
    let c = this.check();
    if (c) return c;

    const {
      params: {
        id
      },
      dispatch,
      ...rest
    } = this.props;

    return <MatchEdit
      onSubmit={this.onSubmit}
      dispatch={dispatch}
      {...rest}
    />;
  }
}
export default MatchEditContainer;
