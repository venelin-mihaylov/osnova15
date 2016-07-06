"use strict"
import React from "react"
import {autobind} from "core-decorators"
import {connect} from "react-redux"
import EntityList from "components/EntityList"
import HasSelectionHOC from 'hoc/HasSelectionHOC'
import OsnovaListContainer from 'components/OsnovaListContainer'
import CRUDAct from 'constants/CRUDAct'
import {toUri} from 'utils/Util'
import {push} from 'react-router-redux'

@connect(state => ({redux: state.matchCompetitor}))
@autobind
@HasSelectionHOC('redux.listRecords')
export default class MatchCompetitorListContainer extends OsnovaListContainer {

  static entity = 'matchCompetitor'

  serverListParams() {
    return {
      filter: {
        matchId: this.props.params.matchId
      }
    }
  }

  componentWillMount() {
    super.componentWillMount()
    this.props.dispatch(this.act(CRUDAct.SET_NEXT_URI, toUri('match', this.props.params.matchId, 'competitor')))
  }

  uri({action, id}) {
    return toUri('match', this.props.params.matchId, 'competitor', id, action)
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
        title: 'Дисквалифициран'
      }]}
      {...this.props}
      {...(this.addProps())}
    />
  }
}
