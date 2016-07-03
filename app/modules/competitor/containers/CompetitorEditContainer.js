"use strict"
import React from "react"
import {connect} from "react-redux"
import {autobind} from "core-decorators"
import EntityEdit from "components/EntityEdit"
import CompetitorFormFields from "modules/competitor/components/CompetitorFormFields"
import EditContainerHOC from 'hoc/EditContainerHOC'

@connect(state => ({
  redux: state.competitor,
  form: state.competitorForm,
  model: state.competitorModel
}))
@autobind
@EditContainerHOC({
  entity: 'competitor'
})
class CompetitorEditContainer extends React.Component {
  render() {
    return (<EntityEdit
      FormFieldsComponent={CompetitorFormFields}
      {...this.props}
    />)
  }
}
export default CompetitorEditContainer
