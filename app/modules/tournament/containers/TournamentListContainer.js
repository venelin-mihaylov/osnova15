"use strict"
import React from "react"
import {autobind} from "core-decorators"
import {connect} from "react-redux"
import EntityList from "components/EntityList"
import HasSelectionHOC from 'hoc/HasSelectionHOC'
import OsnovaListContainer from 'components/OsnovaListContainer'
import CRUDAct from 'constants/CRUDAct'
import {push} from 'react-router-redux'

@connect(state => ({redux: state.tournament}))
@autobind
@HasSelectionHOC('redux.listRecords')

export default class TournamentListContainer extends OsnovaListContainer {

  static entity = 'tournament'

  render() {

    const {
      dispatch
    } = this.props

    let addProps = this.addProps()
    addProps.onAddClick = () => {
      dispatch(this.act(CRUDAct.SET_NEXT_URI, {nextUri:'/match'}))
      dispatch(push(this.uri({action: 'add'})))
    }

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
      {...(addProps)}
    />
  }
}
