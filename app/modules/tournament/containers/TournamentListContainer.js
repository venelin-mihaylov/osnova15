"use strict";
import React from "react";
import {autobind} from "core-decorators";
import {connect} from "react-redux";
import TournamentList from "modules/tournament/components/TournamentList";
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

    return <TournamentList
      {...{listLoading, listError}}
      dataSource={listRecords}
      toolbarTitle="Tournaments"
      limit={listLimit}
      columns={[{
        name: 'id',
        title: 'ИД'
      }, {
        name: 'name',
        title: 'Име'
      }, {
        name: 'startDate',
        title: 'Стартиращ на'
      }]}
      {...rest}
    />;
  }
}
