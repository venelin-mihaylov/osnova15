"use strict"
import React from "react"
import {connect} from "react-redux"
import {autobind} from "core-decorators"
import EntityEdit from "components/EntityEdit"
import MatchFormFields from "modules/match/components/MatchFormFields"
import EditContainerHOC from 'hoc/EditContainerHOC'

@connect(state => ({
  redux: state.match,
  form: state.matchForm,
  model: state.matchModel
}))
@autobind
@EditContainerHOC('match')
class MatchEditContainer extends React.Component {
  render() {
    return (<EntityEdit
      FormFieldsComponent={MatchFormFields}
      {...this.props}
    />)
  }
}
export default MatchEditContainer
