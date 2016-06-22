"use strict";
import React from "react";
import {connect} from "react-redux";
import {autobind} from "core-decorators";
import EntityEdit from "components/EntityEdit";
import MatchForm from "modules/tournament/components/MatchForm";
import EditContainerHOC from 'hoc/EditContainerHOC';

@connect(state => ({
  redux: state.tournament,
  form: state.tournamentForm
}))
@autobind
@EditContainerHOC('tournament')
class MatchEditContainer extends React.Component {
  render() {
    return <EntityEdit
      FormComponent={MatchForm}
      {...this.props}
    />;
  }
}
export default MatchEditContainer;
