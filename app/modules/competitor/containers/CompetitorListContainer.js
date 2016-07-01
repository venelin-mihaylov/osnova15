"use strict"
import React from "react"
import {autobind} from "core-decorators"
import {connect} from "react-redux"
import EntityList from "components/EntityList"
import HasSelectionHOC from 'hoc/HasSelectionHOC'
import ListContainerHOC from 'hoc/ListContainerHOC'

@connect(state => ({redux: state.competitor}))
@autobind
@HasSelectionHOC('redux.listRecords')
@ListContainerHOC({entity: 'competitor'})
export default class CompetitorListContainer extends React.Component {
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
    />
  }
}