import React from 'react'
import {connect} from 'react-redux'
import {autobind} from 'core-decorators'
import ItoNActionType from 'constants/ItoNActionType'
import MatchCompetitorEdit from 'modules/match/components/MatchCompetitorEdit'

@connect(state => ({
  redux: state.ItoNMatchCompetitor,
  nav: state.nav
}))
@autobind
export default class MatchCompetitorEditContainer extends React.Component {

  constructor() {
    super()
    this.entity = 'match'
    this.relation = 'competitor'
    this.act = ItoNActionType.act(this.entity, this.relation)
  }

  componentWillMount() {
    this.props.dispatch(this.act(ItoNActionType.I_TO_N_LIST_REQUESTED, {parentId: this.props.params.parentId}))
  }

  render() {
    return <MatchCompetitorEdit
    />
  }

}