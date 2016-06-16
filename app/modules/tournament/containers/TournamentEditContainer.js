"use strict";
import React from "react";
import {connect} from "react-redux";
import {autobind} from "core-decorators";
import TournamentEdit from "modules/tournament/components/TournamentEdit";
import CRUDEditContainer from "containers/crud/CRUDEditContainer";
import CRUDActionType from 'constants/CRUDActionType';


@connect(state => ({redux: state.tournament}))
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
    let c = this.check();
    if (c) return c;

    const {
      dispatch,
      ...rest
    } = this.props;

    return <TournamentEdit
      onSubmit={record => dispatch({type: this.prefix(CRUDActionType.UPDATE_REQUESTED), record})}
      entity={this.entity}
      {...rest}
    />;
  }
}
export default TournamentEditContainer;
