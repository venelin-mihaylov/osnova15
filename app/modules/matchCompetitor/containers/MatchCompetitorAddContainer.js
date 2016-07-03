"use strict"
import React from "react"
import {connect} from "react-redux"
import {autobind} from "core-decorators"
import EntityAdd from "components/EntityAdd"
import MatchCompetitorFormFields from "modules/matchCompetitor/components/MatchCompetitorFormFields"
import OsnovaAddContainer from 'components/OsnovaAddContainer'

@connect(state => ({
  redux: state.matchCompetitor,
  form: state.matchCompetitorForm
}))
@autobind
class MatchCompetitorAddContainer extends OsnovaAddContainer {

  static entity = 'matchCompetitor'

  render() {
    return (<EntityAdd
      FormFieldsComponent={MatchCompetitorFormFields}
      {...this.props}
      {...(this.addProps())}
    />)
  }
}
export default MatchCompetitorAddContainer

