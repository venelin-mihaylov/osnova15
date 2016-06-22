"use strict";
import React from "react";
import reactMixin from "react-mixin";
import {autobind} from "core-decorators";
import {connect} from "react-redux";
import MatchTable from "MatchTable.js";
import CRUDAction2 from "actions/base/CRUDAction2";
import CRUDTableContainer from "modules/common/containers/CRUDTableContainer";
import {DefaultSession as RethinkSession, r, DefaultMixin, QueryRequest} from "react-rethinkdb";

@connect(state => ({redux: state.match}))
@reactMixin.decorate(DefaultMixin)
@autobind
class MatchListContainer extends CRUDTableContainer {

  action = new CRUDAction2({dbTable: 'match', rethinkSession: RethinkSession});

  observe(props) {
    return {
      records: new QueryRequest({
        query: r.table("match").orderBy({index: 'name'}).eqJoin("tournamentID", r.table("tournament")).limit(props.redux.limit),
        changes: true,
        initial: []
      })
    }
  }

  render() {
    const {
      redux: {
        limit
      },
      ...rest
    } = this.props;

    return <MatchTable
      onAddClick={this.onAddClick}
      onEditClick={this.onEditClick}
      onDeleteClick={this.onDeleteClick}
      onLimitChange={this.onLimitChange}
      data={this.data.records.value()}
      toolbarTitle="Matches"
      onSelectionChange={this.onSelectionChange}
      limit={limit}
      columns={[{
        name: 'name',
        label: 'Name'
      }, {
        name: 'tournamentID',
        label: 'TournamentID'
      }]}
      {...rest}
    />;
  }
}
export default MatchListContainer;
