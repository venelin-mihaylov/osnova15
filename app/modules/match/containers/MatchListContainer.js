"use strict";
import React from "react";
import {autobind} from "core-decorators";
import {connect} from "react-redux";
import MatchTable from "modules/match/components/MatchTable";
import HasSelectionHOC from 'hoc/HasSelectionHOC';
import ListContainerHOC from 'hoc/ListContainerHOC';

@connect(state => ({redux: state.match}))
@autobind
@HasSelectionHOC('redux.listRecords')
@ListContainerHOC('match')
export default class MatchListContainer extends React.Component {

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

    return <MatchTable
      {...{listLoading, listError}}
      dataSource={listRecords}
      toolbarTitle="Matches"
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
