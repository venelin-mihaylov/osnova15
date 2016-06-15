"use strict";
import React from "react";
import {autobind} from "core-decorators";
import {connect} from "react-redux";
import {push} from 'react-router-redux';
import TournamentTable from "modules/tournament/components/TournamentTable";
import CRUDActionType from 'constants/CRUDActionType';

@connect(state => ({redux: state.tournament}))
@autobind
class TournamentListContainer extends React.Component {

  entity = 'tournament';

  componentWillMount() {
    this.props.dispatch({type: CRUDActionType.prefix(this.entity, CRUDActionType.LIST_REQUESTED)})
  }

  render() {
    const {
      dispatch,
      redux: {
        listRecords,
        listLoading,
        listError,
        listPage,
        listLimit
      }
    } = this.props;

    const entityActionType = CRUDActionType.entityActionType(this.entity);

    if(listLoading) {
      return <p>Loading ...</p>;
    }
    if(listError) {
      return <p>Error: {listError}</p>;
    }

    return <TournamentTable
      onAddClick={() => (dispatch(push(`/${this.entity}/add`)))}
      onEditClick={() => this.withFirstSelectedRecord(record => dispatch(push(`/${this.entity}/edit/${record.id}`)))}
      onDeleteClick={() => this.withFirstSelectedRecord(record => dispatch({type: entityActionType(CRUDActionType.DELETE_REQUESTED), id: record.id}))}
      onLimitChange={(event, limit) => dispatch({type: entityActionType(CRUDActionType.LIST_SET_LIMIT), limit: limit })}
      onRefresh={() => dispatch({type: entityActionType(CRUDActionType.LIST_REQUESTED)})}
      data={listRecords}
      toolbarTitle="Tournaments"
      onRowSelection={() => {}}
      limit={listLimit}
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
