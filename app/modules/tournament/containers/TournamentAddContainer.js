"use strict";
import React from "react";
import {connect} from "react-redux";
import {autobind} from "core-decorators";
import TournamentAdd from "modules/tournament/components/TournamentAdd";
import CRUDAddContainer from "containers/crud/CRUDAddContainer";

@connect(state => ({redux: state.tournament}))
@autobind
class TournamentAddContainer extends CRUDAddContainer {

  render() {
    return (<TournamentAdd
      onSubmit={this.onSubmit}
      {...this.props}
    />)
  }
}
export default TournamentAddContainer;

