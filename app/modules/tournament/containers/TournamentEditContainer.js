"use strict";
import React from "react";
import {connect} from "react-redux";
import {autobind} from "core-decorators";
import TournamentEdit from "modules/tournament/components/TournamentEdit";
import CRUDEditContainer from "containers/crud/CRUDEditContainer";

@connect(state => ({redux: state.tournament}))
@autobind
class TournamentEditContainer extends CRUDEditContainer {

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
