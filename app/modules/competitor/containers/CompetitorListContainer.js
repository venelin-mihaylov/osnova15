"use strict"
import React from "react"
import {autobind} from "core-decorators"
import {connect} from "react-redux"
import EntityList from "components/EntityList"
import HasSelectionHOC from 'hoc/HasSelectionHOC'
import OsnovaListContainer from 'components/OsnovaListContainer'

@connect(state => ({redux: state.competitor}))
@autobind
@HasSelectionHOC('redux.listRecords')
export default class CompetitorListContainer extends OsnovaListContainer {

  static entity = 'competitor'

  render() {

    return <EntityList
      toolbarTitle="Competitors"
      columns={[{
        name: 'id',
        title: 'ИД'
      }, {
        name: 'firstName',
        title: 'first name'
      }, {
        name: 'lastName',
        title: 'last name'
      }, {
        name: 'email',
        title: 'email'
      }]}
      {...this.props}
      {...(this.addProps())}
    />
  }
}