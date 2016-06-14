"use strict";
import React from "react";
import {autobind} from "core-decorators";
import {connect} from "react-redux";
import TournamentTable from "modules/tournament/components/TournamentTable";
import CRUDTableContainer from "modules/common/containers/CRUDTableContainer";

@connect(state => ({redux: state.tournament}))
@autobind
class TournamentTableContainer extends CRUDTableContainer {

  render() {
    return <TournamentTable
      onAddClick={this.onAddClick}
      onEditClick={this.onEditClick}
      onDeleteClick={this.onDeleteClick}
      onLimitChange={this.onLimitChange}
      data={this.data.records.value()}
      toolbarTitle="Tournaments"
      onRowSelection={this.onRowSelection}
      limit={this.props.redux.limit}
      columns={[{
        name: 'name',
        label: 'Име'
      }, {
        name: 'startDate',
        label: 'Стартиращ на'
      }]}
    />;
  }
}
export default TournamentTableContainer;
