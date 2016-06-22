"use strict";
import React from "react";
import {connect} from "react-redux";
import {autobind} from "core-decorators";
import EntityAdd from "components/EntityAdd";
import MatchForm from "modules/tournament/components/MatchForm";
import AddContainerHOC from 'hoc/AddContainerHOC';

@connect(state => ({
  redux: state.tournament,
  form: state.tournamentForm
}))
@autobind
@AddContainerHOC('tournament')
class MatchAddContainer extends React.Component {

  render() {
    return (<EntityAdd
      FormComponent={MatchForm}
      {...this.props}
    />)
  }
}
export default MatchAddContainer;

