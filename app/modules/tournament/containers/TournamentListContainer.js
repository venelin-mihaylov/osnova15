"use strict";
import React from "react";
import {autobind} from "core-decorators";
import {connect} from "react-redux";
import {push} from 'react-router-redux';
import TournamentTable from "modules/tournament/components/TournamentTable";
import HasSelectionHOC from 'hoc/HasSelectionHOC';
import ListContainerHOC from 'hoc/ListContainerHOC';

@connect(state => ({redux: state.tournament}))
@autobind
@HasSelectionHOC('redux.listRecords')
@ListContainerHOC('tournament')
export default class TournamentListContainer extends React.Component {

  render() {
    const {
      redux: {
        listRecords,
        listLoading,
        listError,
        listLimit
      },
      ...rest
    } = this.props;

    if(listLoading) {
      return <p>Loading ...</p>;
    }
    if(listError) {
      return <p>Error: {listError}</p>;
    }

    return <TournamentTable
      data={listRecords}
      toolbarTitle="Tournaments"
      limit={listLimit}
      columns={[{
        name: 'name',
        label: 'Име'
      }, {
        name: 'startDate',
        label: 'Стартиращ на'
      }]}
      {...rest}
    />;
  }
}
