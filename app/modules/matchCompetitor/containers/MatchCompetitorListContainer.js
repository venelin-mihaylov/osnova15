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


// how to determine the next uri in the app
// maybe if we have a separate reducer?
//
/*
  // where to forward after add/edit submit

  getNextUri(curUri) {
   // if there is a specific setting, then apply it
  next = fn(curUri)
  if(next) return next

  // apply regex's until we get a match
  //if we are at /add or /edit, go back to the list
  tournament/id/edit -> tournament
  match/id/view -> match

  // for
  match/id/competitor/add/new-competitor we go back to
  match/id/competitor/add

  // for
  match/id/exercise/add/new-exercise we go back to
  match/id/exercise/add

  // this is easier to test than having
  // a next uri setting in the crud reducer


 */


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
