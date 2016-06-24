"use strict"
import React from "react"
import {autobind} from "core-decorators"
import {connect} from "react-redux"
import EntityList from "components/EntityList"
import HasSelectionHOC from 'hoc/HasSelectionHOC'
import ListContainerHOC from 'hoc/ListContainerHOC'

@connect(state => ({redux: state.match}))
@autobind
@HasSelectionHOC('redux.listRecords')
@ListContainerHOC('match')
export default class MatchListContainer extends React.Component {
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
        name: 'tournament_id__name',
        title: 'Състезание'
      }]}
      {...this.props}
    />
  }
}