"use strict"
import React from "react"
import {autobind} from "core-decorators"
import {connect} from "react-redux"
import EntityList from "components/EntityList"
import HasSelectionHOC from 'hoc/HasSelectionHOC'
import OsnovaListContainer from 'components/OsnovaListContainer'

@connect(state => ({redux: state.competitor}))
@autobind
@HasSelectionHOC({dataProp: 'redux.listRecords'})
export default class CompetitorListContainer extends OsnovaListContainer {

  static entity = 'competitor'

  render() {

    return <EntityList
      toolbarTitle="Competitors"
      columns={[{
        header: {
          label: 'id'
        },
        cell: {
          property: 'id'
        }
      }, {
        header: {
          label: 'firstName'
        },
        cell: {
          property: 'firstName'
        }
      }, {
        header: {
          label: 'lastName'
        },
        cell: {
          property: 'lastName'
        }
      }, {
        header: {
          label: 'email'
        },
        cell: {
          property: 'email'
        }
      }]}
      {...this.props}
      {...(this.addProps())}
    />
  }
}