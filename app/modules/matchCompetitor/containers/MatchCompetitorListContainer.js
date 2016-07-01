"use strict"
import React from "react"
import {autobind} from "core-decorators"
import {connect} from "react-redux"
import EntityList from "components/EntityList"
import HasSelectionHOC from 'hoc/HasSelectionHOC'
import ListContainerHOC from 'hoc/ListContainerHOC'

@connect(state => ({redux: state.tournament}))
@autobind
@HasSelectionHOC('redux.listRecords')
@ListContainerHOC({entity: 'tournament'})
export default class TournamentListContainer extends React.Component {
  render() {
    return <EntityList
      toolbarTitle="Tournaments"
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
      {...this.props}
    />
  }
}
