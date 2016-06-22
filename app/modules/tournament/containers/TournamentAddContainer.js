"use strict";
import React from "react";
import {connect} from "react-redux";
import {autobind} from "core-decorators";
import EntityAdd from "components/EntityAdd";
import TournamentForm from "modules/tournament/components/TournamentForm";
import AddContainerHOC from 'hoc/AddContainerHOC';

@connect(state => ({
  redux: state.tournament,
  form: state.tournamentForm
}))
@autobind
@AddContainerHOC('tournament')
class TournamentAddContainer extends React.Component {

  render() {
    return (<EntityAdd
      FormComponent={TournamentForm}
      {...this.props}
    />)
  }
}
export default TournamentAddContainer;

