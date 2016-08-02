"use strict"
import React from "react"
import {connect} from "react-redux"
import {autobind} from "core-decorators"
import EntityFormWrapper from "components/EntityFormWrapper"
import MatchFormFields from "modules/match/components/MatchFormFields"
import OsnovaFormContainer from 'components/OsnovaFormContainer'
import {actions} from 'react-redux-form'
import {toUri, rrfField, navigateToCreateFKRecordAndScheduleSelect, doSelectCreatedFK} from 'utils/Util'

@connect(state => ({
  redux: state.match,
  form: state.matchForm,
  model: state.matchModel,
  misc: state.misc,
  createdCompetitor: state.competitor.savedRecord
}))
@autobind
class MatchFormContainer extends OsnovaFormContainer {

  static entity = 'match'

  componentWillMount() {
    super.componentWillMount()
  }

  render() {
    const {
      dispatch,
      model: {match_competitor = []},
      params: {id},
      route: {action},
      location: {pathname}
    } = this.props
    const entity = this.constructor.entity

    return (<EntityFormWrapper
      FormFieldsComponent={MatchFormFields}
      {...this.props}
      {...(this.addProps())}
    />)
  }
}
export default MatchFormContainer
