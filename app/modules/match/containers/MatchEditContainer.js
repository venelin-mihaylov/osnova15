"use strict";
import React from "react";
import {connect} from "react-redux";
import {autobind} from "core-decorators";
import EntityEdit from "components/EntityEdit";
import MatchForm from "modules/match/components/MatchForm";
import EditContainerHOC from 'hoc/EditContainerHOC';

@connect(state => ({
  redux: state.match,
  form: state.matchForm
}))
@autobind
@EditContainerHOC('match')
class MatchEditContainer extends React.Component {
  render() {
    return <EntityEdit
      FormComponent={MatchForm}
      {...this.props}
    />;
  }
}
export default MatchEditContainer;
