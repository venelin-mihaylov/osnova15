import React from 'react'
import {connect} from 'react-redux'
import {autobind} from 'core-decorators'
import MatchCompetitorEdit from 'modules/match/components/MatchCompetitorEdit'

@connect(state => ({
  redux: state.match,
  nav: state.nav
}))
@autobind
export default class MatchCompetitorEditContainer extends React.Component {

  render() {
    return <MatchCompetitorEdit/>
  }

}