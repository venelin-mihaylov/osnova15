"use strict";
import React from "react";
import {connect} from "react-redux";
import {autobind} from "core-decorators";
import TournamentAdd from "modules/tournament/components/TournamentAdd";
import CRUDAddContainer from "containers/crud/CRUDAddContainer";
import CRUDActionType from 'constants/CRUDActionType';

@connect(state => ({redux: state.tournament}))
@autobind
class TournamentAddContainer extends CRUDAddContainer {

  entity = 'tournament';

  render() {
    const {
      dispatch,
      ...rest
    } = this.props;

    var entityActionType = CRUDActionType.prefixActionType(this.entity);

    return (<TournamentAdd
      onSubmit={model => dispatch({
        type: entityActionType(CRUDActionType.CREATE_REQUESTED),
        model
       })}
      onReset={() => {}}
      entity={this.entity}
      {...rest}
    />)
  }
}
export default TournamentAddContainer;

