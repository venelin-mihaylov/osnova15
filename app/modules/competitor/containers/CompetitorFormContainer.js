"use strict"
import React from "react"
import {connect} from "react-redux"
import {autobind} from "core-decorators"
import EntityFormWrapper from "components/EntityFormWrapper"
import CompetitorFormFields from "modules/competitor/components/CompetitorFormFields"
import OsnovaFormContainer from 'components/OsnovaFormContainer.js'

@connect(state => ({
  redux: state.competitor,
  form: state.competitorForm,
  model: state.competitorModel
}))
@autobind
class CompetitorFormContainer extends OsnovaFormContainer {
  static entity = 'competitor'

  render() {
    return (<EntityFormWrapper
      FormFieldsComponent={CompetitorFormFields}
      {...this.props}
      {...(this.addProps())}
    />)
  }
}
export default CompetitorFormContainer
