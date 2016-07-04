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

  componentWillMount() {
    this.props.dispatch(this.act(CRUDAct.LIST_REQUESTED, {
      filter: {
        matchId: this.props.params.matchId
      }
    }))
  }

  uri({action, id}) {
    return toUri(['match', this.props.params.matchId, 'competitor', id, action])
  }


  render() {
    const {
      dispatch
    } = this.props

    let addProps = this.addProps()
    addProps.onAddClick = () => {
      dispatch(this.act(CRUDAct.SET_NEXT_URI, {nextUri:'/tournament'}))
      dispatch(push(this.uri({action: 'add'})))
    }

    return <EntityList
      toolbarTitle="MatchCompetitors"
      columns={[{
        name: 'id',
        title: 'ИД'
      }, {
        name: 'competitorId',
        title: 'Състезател ИД'
      }, {
        name: 'disqualified',
        title: 'Дисквалифициран'
      }]}
      {...this.props}
      {...(addProps)}
    />
  }
}
