"use strict"
import React from "react"
import {connect} from "react-redux"
import {autobind} from "core-decorators"
import EntityAdd from "components/EntityAdd"
import CompetitorFormFields from "modules/competitor/components/CompetitorFormFields"
import OsnovaAddContainer from 'components/OsnovaAddContainer'

@connect(state => ({
  redux: state.competitor,
  form: state.competitorForm,
  model: state.competitorModel
}))
@autobind
class CompetitorAddContainer extends OsnovaAddContainer {

  static entity = 'competitor'

  render() {
    return <EntityAdd
      FormFieldsComponent={CompetitorFormFields}
      {...this.props}
      {...(this.addProps())}
    />
  }
}
export default CompetitorAddContainer

