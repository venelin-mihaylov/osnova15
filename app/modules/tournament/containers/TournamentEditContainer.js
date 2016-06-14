"use strict";
import React from "react";
import {connect} from "react-redux";
import {autobind} from "core-decorators";
import CRUDAction2 from "actions/base/CRUDAction2";
import TournamentEdit from "modules/tournament/components/TournamentEdit";
import CRUDEditContainer from "modules/common/containers/CRUDEditContainer";
import {DefaultSession as RethinkSession} from "react-rethinkdb";

@connect(state => ({redux: state.tournament}))
@autobind
class TournamentEditContainer extends CRUDEditContainer {

  action = new CRUDAction2({dbTable: 'tournament', rethinkSession: RethinkSession});

  render() {
    let c = this.check();
    if (c) return c;

    return <TournamentEdit
      onSubmit={this.onSubmit}
      {...this.props}
    />;
  }
}
export default TournamentEditContainer;
