"use strict"
import React from "react"
import {autobind} from "core-decorators"
import {connect} from "react-redux"
import EntityList from "components/EntityList"
import HasSelectionHOC from 'hoc/HasSelectionHOC'
import OsnovaListContainer from 'components/OsnovaListContainer'

@connect(state => ({redux: state.matchCompetitor}))
@autobind
@HasSelectionHOC({dataProp: 'redux.listRecords'})
export default class MatchCompetitorListContainer extends OsnovaListContainer {

  static entity = 'matchCompetitor'

  baseListParams() {
    return {
      filter: {
        matchId: {
          operator: '=',
          value: this.props.params.matchId
        }
      }
    }
  }

  render() {
    return <EntityList
      toolbarTitle="MatchCompetitors"
      columns={[{
        name: 'id',
        title: 'ИД'
      }, {
        name: 'competitorId',
        title: 'Състезател',
        render: ({data: {competitor}}) => (competitor ? `${competitor.firstName} ${competitor.lastName}` : '')
      }, {
        name: 'disqualified',
        title: 'Дисквалифициран',
        render: ({value}) => value ? 'Yes' : 'No'
      }]}
      {...this.props}
      {...(this.addProps())}
    />
  }
}
