"use strict"
import React from "react"
import {connect} from "react-redux"
import {autobind} from "core-decorators"
import EntityFormWrapper from "components/EntityFormWrapper"
import MatchCompetitorFormFields from "modules/matchCompetitor/components/MatchCompetitorFormFields"
import OsnovaFormContainer from 'components/OsnovaFormContainer'

@connect(state => ({
  redux: state.matchCompetitor,
  form: state.matchCompetitorForm
}))
@autobind
class MatchCompetitorFormContainer extends OsnovaFormContainer {

  static entity = 'matchCompetitor'

  render() {
    return (<EntityFormWrapper
      FormFieldsComponent={MatchCompetitorFormFields}
      {...this.props}
      {...(this.addProps())}
    />)
  }
}
export default MatchCompetitorFormContainer
