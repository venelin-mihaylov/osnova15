"use strict";
import React from "react";
import {connect} from "react-redux";
import {autobind} from "core-decorators";
import CRUDAction2 from "actions/base/CRUDAction2";
import TournamentAdd from "modules/tournament/components/TournamentAdd";
import CRUDAddContainer from "modules/common/containers/CRUDAddContainer";
import {DefaultSession as RethinkSession} from "react-rethinkdb";

@connect(state => ({redux: state.tournament}))
@autobind
class TournamentAddContainer extends CRUDAddContainer {

  action = new CRUDAction2({dbTable: 'tournament', rethinkSession: RethinkSession});

  render() {
    return (<TournamentAdd
      onSubmit={this.onSubmit}
      {...this.props}
    />)
  }
}
export default TournamentAddContainer;

