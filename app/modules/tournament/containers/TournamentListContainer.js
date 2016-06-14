"use strict";
import React from "react";
import {autobind} from "core-decorators";
import {connect} from "react-redux";
import {push} from 'react-router-redux';
import TournamentTable from "modules/tournament/components/TournamentTable";
import CRUDTableContainer from "containers/crud/CRUDTableContainer";

@connect(state => ({redux: state.tournament}))
@autobind
class TournamentListContainer extends CRUDTableContainer {

  entity = 'tournament';

  render() {
    const {
      dispatch
    } = this.props;

    return <TournamentTable
      onAddClick={() => dispatch(push(`/${this.entity}/add`))}
      onEditClick={this.onEditClick}
      onDeleteClick={this.onDeleteClick}
      onLimitChange={this.onLimitChange}
      data={[]}
      toolbarTitle="Tournaments"
      onRowSelection={this.onRowSelection}
      limit={5}
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
export default TournamentListContainer;
