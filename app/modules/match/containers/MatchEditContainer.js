"use strict"
import React from "react"
import {connect} from "react-redux"
import {autobind} from "core-decorators"
import EntityEdit from "components/EntityEdit"
import MatchFormFields from "modules/match/components/MatchFormFields"
import OsnovaEditContainer from 'components/OsnovaEditContainer'

@connect(state => ({
  redux: state.match,
  form: state.matchForm,
  model: state.matchModel
}))
@autobind
class MatchEditContainer extends OsnovaEditContainer {

  static entity = 'match'

  render() {
    return (<EntityEdit
      FormFieldsComponent={MatchFormFields}
      {...this.props}
      {...(this.addProps())}
    />)
  }
}
export default MatchEditContainer
