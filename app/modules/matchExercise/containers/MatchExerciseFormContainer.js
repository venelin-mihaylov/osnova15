"use strict"
import React from "react"
import {connect} from "react-redux"
import {autobind} from "core-decorators"
import EntityFormWrapper from "components/EntityFormWrapper"
import MatchExerciseFormFields from "modules/matchExercise/components/MatchExerciseFormFields"
import OsnovaFormContainer from 'components/OsnovaFormContainer'
import {toUri, navigateToCreateFKRecordAndScheduleSelect, doSelectCreatedFK} from 'utils/Util'

@connect(state => ({
  redux: state.matchExercise,
  model: state.matchExerciseModel,
  form: state.matchExerciseForm,
  createdExercise: state.exercise.savedRecord
}))
@autobind
class MatchExerciseFormContainer extends OsnovaFormContainer {

  static entity = 'matchExercise'

  componentWillMount() {
    super.componentWillMount()

    doSelectCreatedFK({
      dispatch: this.props.dispatch,
      entity: this.constructor.entity,
      selectCreatedFK: this.props.redux.selectCreatedFK,
      createdExercise: this.props.createdExercise
    })
  }

  onCreate(record) {
    super.onCreate({
      matchId: this.props.params.matchId,
      ...record
    })
  }

  onUpdate(record) {
    super.onUpdate({
      matchId: this.props.params.matchId,
      ...record
    })
  }

  render() {
    const {
      dispatch,
      location: {pathname}
    } = this.props
    const entity = this.constructor.entity

    return (<EntityFormWrapper
      FormFieldsComponent={MatchExerciseFormFields}
      {...this.props}
      {...(this.addProps())}
      onClickAddExercise={() => {
        navigateToCreateFKRecordAndScheduleSelect({
          dispatch,
          entity,
          nextUri: `${pathname}/create-exercise`,
          scheduleSelect: [{
            fkEntity: 'exercise',
            fkVariation: '1',
            foreignKey: 'exerciseId',
            relationType: 'one',
            relationOne: 'exercise',
            propFKRecord: 'createdExercise',
          }]
        })
      }}

    />)
  }
}
export default MatchExerciseFormContainer
