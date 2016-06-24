"use strict"
import React from "react"
import {connect} from "react-redux"
import {autobind} from "core-decorators"
import EntityEdit from "components/EntityEdit"
import CompetitorForm from "modules/match/components/CompetitorForm"
import EditContainerHOC from 'hoc/EditContainerHOC'

@connect(state => ({
  redux: state.match,
  form: state.matchForm
}))
@autobind
@EditContainerHOC('match')
class CompetitorEditContainer extends React.Component {
  render() {
    return <EntityEdit
      FormComponent={CompetitorForm}
      {...this.props}
    />
  }
}
export default CompetitorEditContainer
