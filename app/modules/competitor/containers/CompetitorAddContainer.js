"use strict"
import React from "react"
import {connect} from "react-redux"
import {autobind} from "core-decorators"
import EntityAdd from "components/EntityAdd"
import CompetitorFormFields from "modules/competitor/components/CompetitorFormFields"
import AddContainerHOC from 'hoc/AddContainerHOC'

@connect(state => ({
  redux: state.competitor,
  form: state.competitorForm,
  model: state.competitorModel
}))
@autobind
@AddContainerHOC('competitor')
class CompetitorAddContainer extends React.Component {

  render() {
    return (<EntityAdd
      FormFieldsComponent={CompetitorFormFields}
      {...this.props}
    />)
  }
}
export default CompetitorAddContainer

