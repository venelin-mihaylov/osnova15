"use strict";
import React from "react";
import {connect} from "react-redux";
import {autobind} from "core-decorators";
import EntityAdd from "components/EntityAdd";
import MatchForm from "modules/match/components/MatchForm";
import AddContainerHOC from 'hoc/AddContainerHOC';

@connect(state => ({
  redux: state.match,
  form: state.matchForm
}))
@autobind
@AddContainerHOC('match')
class MatchAddContainer extends React.Component {

  render() {
    return (<EntityAdd
      FormComponent={MatchForm}
      {...this.props}
    />)
  }
}
export default MatchAddContainer;

