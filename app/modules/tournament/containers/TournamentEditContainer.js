"use strict";
import React from "react";
import {connect} from "react-redux";
import {autobind} from "core-decorators";
import TournamentEdit from "modules/tournament/components/TournamentEdit";
import CRUDEditContainer from "containers/crud/CRUDEditContainer";
import CRUDActionType from 'constants/CRUDActionType';
import resetFormRecord from 'actions/resetFormRecord';

@connect(state => ({
  redux: state.tournament,
  form: state.tournamentForm
}))
@autobind
class TournamentEditContainer extends CRUDEditContainer {

  entity = 'tournament';

  constructor() {
    super();
    this.prefix = CRUDActionType.prefixActionType(this.entity);
  }

  componentWillMount() {
    this.props.dispatch({type: this.prefix(CRUDActionType.READ_REQUESTED), id: this.props.params.id});
  }

  render() {
    const entity = this.entity;
    const act = CRUDActionType.act(entity);
    const {
      dispatch,
      ...rest
    } = this.props;

    return <TournamentEdit
      onSubmit={record => dispatch(act(CRUDActionType.UPDATE_REQUESTED, {record}))}
      onReset={() => dispatch(resetFormRecord(entity))}
      entity={entity}
      dispatch={dispatch}
      {...rest}
    />;
  }
}
export default TournamentEditContainer;
