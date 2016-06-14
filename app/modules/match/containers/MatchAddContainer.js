"use strict";
import React from "react";
import {connect} from "react-redux";
import {autobind} from "core-decorators";
import CRUDAction2 from "actions/base/CRUDAction2";
import MatchAdd from "MatchAdd.js";
import CRUDAddContainer from "modules/common/containers/CRUDAddContainer";
import {DefaultSession as RethinkSession} from "react-rethinkdb";

@connect(state => ({redux: state.match}))
@autobind
class MatchAddContainer extends CRUDAddContainer {

  action = new CRUDAction2({dbTable: 'match', rethinkSession: RethinkSession});


  render() {
    return (<MatchAdd
      onSubmit={this.onSubmit}
      {...this.props}
    />)
  }
}
export default MatchAddContainer;

