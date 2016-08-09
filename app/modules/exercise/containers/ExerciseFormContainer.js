'use strict'
import React from 'react'
import {connect} from 'react-redux'
import {autobind} from 'core-decorators'
import EntityFormWrapper from 'components/EntityFormWrapper'
import ExerciseFormFields from 'modules/exercise/components/ExerciseFormFields'
import OsnovaFormContainer from 'components/OsnovaFormContainer.js'
import {selectCreatedFK} from 'utils/Util'
import CRUDAct from 'constants/CRUDAct'
import {push} from 'react-router-redux'

@connect(state => ({
  redux: state.exercise,
  model: state.exerciseModel,
  fkRecord: state.target.savedRecord
}))
@autobind
class ExerciseFormContainer extends OsnovaFormContainer {
  static entity = 'exercise'


  componentWillMount() {
    super.componentWillMount()

    selectCreatedFK({
      dispatch: this.props.dispatch,
      entity: this.constructor.entity,
      select: this.props.redux.selectCreatedFK,
      fkParams: [{
        fkEntity: 'target',
        fkRecord: this.props.fkRecord,
        fkFieldName: this.props.redux.selectCreatedFK ? this.props.redux.selectCreatedFK.fkFieldName : null,
        relationType: 'belongsToOne'
      }]
    })
  }

  addMatchExercise(record) {
    const {params:{matchId}} = this.props
    // if present we are adding an exercise for a match
    if(matchId) {
      return Object.assign({}, record, {
        match_exercise: [{matchId}]
      })
    } else {
      return record
    }
  }


  onUpdate(record) {
    return super.onUpdate(record)
  }

  onCreate(record) {
    return super.onCreate(this.addMatchExercise(record))
  }

  render() {
    const {
      dispatch,
      location: {pathname}
    } = this.props

    return <EntityFormWrapper
      FormFieldsComponent={ExerciseFormFields}
      {...this.props}
      {...(this.addProps())}
      onClickAddTarget={({fkFieldName}) => {
        dispatch(this.act(CRUDAct.RESET_FORM, false))
        dispatch(this.act(CRUDAct.SELECT_CREATED_FK_RECORD, {value: {fkFieldName}}))
        dispatch(push(`${pathname}/create-target`))
      }}
    />
  }
}
export default ExerciseFormContainer
