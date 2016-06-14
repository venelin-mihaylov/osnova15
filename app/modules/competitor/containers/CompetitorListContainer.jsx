"use strict";
import React from "react";
import {autobind} from "core-decorators";
import {connect} from "react-redux";
import CompetitorTable from "modules/competitor/components/CompetitorTable";
import CRUDAction2 from "actions/base/CRUDAction2";
import CRUDTableContainer from "modules/common/containers/CRUDTableContainer";
import {DefaultSession as RethinkSession} from "react-rethinkdb";

@connect(state => ({redux: state.competitor}))
@autobind
class CompetitorListContainer extends CRUDTableContainer {

  action = new CRUDAction2({dbTable: 'competitor', rethinkSession: RethinkSession});

  observe(props) {
    return {
      records: new ReactRethinkdb.QueryRequest({
        query: r.table(this.action.dbTable).orderBy({index: 'familyName'}).limit(props.redux.limit),
        changes: true,
        initial: []
      })
    }
  }

  render() {
    return <CompetitorTable
      onAddClick={this.onAddClick}
      onEditClick={this.onEditClick}
      onDeleteClick={this.onDeleteClick}
      onLimitChange={this.onLimitChange}
      data={this.data.records.value()}
      toolbarTitle="Competitors"
      onRowSelection={this.onRowSelection}
      limit={this.props.redux.limit}
      columns={[{
        name: 'firstName',
        label: 'Име'
      }, {
        name: 'familyName',
        label: 'Фамилия'
      }, {
        name: 'email',
        label: 'Емайл'
      }]}
    />;
  }
}
export default CompetitorListContainer;
