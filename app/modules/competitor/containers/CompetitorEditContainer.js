"use strict"
import React from "react"
import {connect} from "react-redux"
import {autobind} from "core-decorators"
import EntityEdit from "components/EntityEdit"
import CompetitorFormFields from "modules/competitor/components/CompetitorFormFields"
import OsnovaEditContainer from 'components/OsnovaEditContainer'

@connect(state => ({
  redux: state.competitor,
  form: state.competitorForm,
  model: state.competitorModel
}))
@autobind
class CompetitorEditContainer extends OsnovaEditContainer {
  entity = 'competitor'

  render() {
    return (<EntityEdit
      FormFieldsComponent={CompetitorFormFields}
      {...this.props}
      {...(this.addProps())}
    />)
  }
}
export default CompetitorEditContainer
