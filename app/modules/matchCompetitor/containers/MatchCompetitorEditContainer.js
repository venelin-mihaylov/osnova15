"use strict"
import React from "react"
import {connect} from "react-redux"
import {autobind} from "core-decorators"
import EntityEdit from "components/EntityEdit"
import MatchCompetitorFormFields from "modules/matchCompetitor/components/MatchCompetitorFormFields"
import OsnovaEditContainer from 'components/OsnovaEditContainer'

@connect(state => ({
  redux: state.matchCompetitor,
  form: state.matchCompetitorForm
}))
@autobind
class MatchCompetitorEditContainer extends OsnovaEditContainer {

  static entity = 'matchCompetitor'

  render() {
    return (<EntityEdit
      FormFieldsComponent={MatchCompetitorFormFields}
      {...this.props}
      {...(this.addProps())}
    />)
  }
}
export default MatchCompetitorEditContainer
