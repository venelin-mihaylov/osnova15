"use strict"
import React from "react"
import {autobind} from "core-decorators"
import {connect} from "react-redux"
import EntityList from "components/EntityList"
import HasSelectionHOC from 'hoc/HasSelectionHOC'
import OsnovaListContainer from 'components/OsnovaListContainer'

@connect(state => ({redux: state.target}))
@autobind
@HasSelectionHOC({dataProp: 'redux.listRecords'})
export default class TargetListContainer extends OsnovaListContainer {

  static entity = 'target'


  baseListParams() {
    if(this.props.route.matchView) {
      return {
        filter: {
          matchId: this.props.params.matchId
        }
      }
    }

    return {}
  }

  render() {
    return <EntityList
      toolbarTitle="Targets"
      columns={[{
        name: 'id',
        title: 'ИД'
      }, {
        name: 'name',
        title: 'name'
      }]}
      {...this.props}
      {...(this.addProps())}
    />
  }
}