"use strict";
import React from "react";
import {connect} from "react-redux";
import {autobind} from "core-decorators";
import TournamentAdd from "modules/tournament/components/TournamentAdd";
import CRUDAddContainer from "containers/crud/CRUDAddContainer";
import CRUDActionType from 'constants/CRUDActionType';

@connect(state => ({
  redux: state.tournament,
  form: state.tournamentForm
}))
@autobind
class TournamentAddContainer extends CRUDAddContainer {

  entity = 'tournament';

  render() {
    const {
      dispatch,
      ...rest
    } = this.props;
    const act = CRUDActionType.act(this.entity);

    return (<TournamentAdd
      onSubmit={record => dispatch(act(CRUDActionType.CREATE_REQUESTED, record))}
      onReset={() => {}}
      entity={this.entity}
      {...rest}
    />)
  }
}
export default TournamentAddContainer;

