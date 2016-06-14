"use strict";
import React from "react";
import {connect} from "react-redux";
import {autobind} from "core-decorators";
import CRUDAction2 from "actions/base/CRUDAction2";
import CompetitorEdit from "modules/competitor/components/CompetitorEdit";
import CRUDEditContainer from "modules/common/containers/CRUDEditContainer";
import {DefaultSession as RethinkSession} from "react-rethinkdb";


@connect(state => ({
  redux: state.competitor,
  form: state.competitorForm
}))
@autobind
class CompetitorEditContainer extends CRUDEditContainer {

  action = new CRUDAction2({dbTable: 'competitor', rethinkSession: RethinkSession});

  render() {
    let c = this.check();
    if (c) return c;

    return <CompetitorEdit
      onSubmit={this.onSubmit}
      {...this.props}
      action={this.action}
    />;
  }
}
export default CompetitorEditContainer;
