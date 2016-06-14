"use strict";
import React from "react";
import {connect} from "react-redux";
import {autobind} from "core-decorators";
import CRUDAction2 from "actions/base/CRUDAction2";
import CompetitorAdd from "modules/competitor/components/CompetitorAdd";
import CRUDAddContainer from "modules/common/containers/CRUDAddContainer";
import {DefaultSession as RethinkSession} from "react-rethinkdb";

@connect(state => ({redux: state.competitor}))
@autobind
class CompetitorAddContainer extends CRUDAddContainer {

  action = new CRUDAction2({dbTable: 'competitor', rethinkSession: RethinkSession});

  render() {
    return (<CompetitorAdd
      onSubmit={this.onSubmit}
      {...this.props}
    />)
  }
}
export default CompetitorAddContainer;

