"use strict"
import React from "react"
import {connect} from "react-redux"
import {autobind} from "core-decorators"
import EntityFormWrapper from "components/EntityFormWrapper"
import ExerciseFormFields from "modules/exercise/components/ExerciseFormFields"
import OsnovaFormContainer from 'components/OsnovaFormContainer.js'

@connect(state => ({
  redux: state.exercise,
  form: state.exerciseForm,
  model: state.exerciseModel
}))
@autobind
class ExerciseFormContainer extends OsnovaFormContainer {
  static entity = 'exercise'

  render() {
    return (<EntityFormWrapper
      FormFieldsComponent={ExerciseFormFields}
      {...this.props}
      {...(this.addProps())}
    />)
  }
}
export default ExerciseFormContainer
