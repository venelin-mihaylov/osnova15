"use strict";
import React from "react";
import {connect} from "react-redux";
import {autobind} from "core-decorators";
import EntityEdit from "components/EntityEdit";
import TournamentForm from "modules/tournament/components/TournamentForm";
import EditContainerHOC from 'hoc/EditContainerHOC';

@connect(state => ({
  redux: state.tournament,
  form: state.tournamentForm
}))
@autobind
@EditContainerHOC('tournament')
class TournamentEditContainer extends React.Component {
  render() {
    return <EntityEdit
      FormComponent={TournamentForm}
      {...this.props}
    />;
  }
}
export default TournamentEditContainer;
