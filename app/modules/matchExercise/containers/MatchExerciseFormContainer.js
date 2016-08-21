import React from 'react'
import {connect} from 'react-redux'
import {autobind} from 'core-decorators'
import EntityFormWrapper from 'components/EntityFormWrapper'
import MatchExerciseFormFields from 'modules/matchExercise/components/MatchExerciseFormFields'
import OsnovaFormContainer from 'components/OsnovaFormContainer'
import {selectCreatedFK} from 'utils/Util'
import {push} from 'react-router-redux'
import CRUDAct from 'constants/CRUDAct'

@connect(state => ({
  redux: state.matchExercise,
  model: state.matchExerciseModel,
  fkRecord: state.exercise.savedRecord
}))
@autobind
class MatchExerciseFormContainer extends OsnovaFormContainer {

  static entity = 'matchExercise'

  componentWillMount() {
    super.componentWillMount()

    selectCreatedFK({
      dispatch: this.props.dispatch,
      entity: this.constructor.entity,
      select: this.props.redux.selectCreatedFK,
      fkParams: [{
        fkEntity: 'exercise',
        fkRecord: this.props.fkRecord,
        fkFieldName: 'exerciseId',
        relationType: 'belongsToOne'
      }]
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
    return (<EntityFormWrapper
      FormFieldsComponent={MatchExerciseFormFields}
      {...this.props}
      {...(this.addProps())}
      onClickAddExercise={() => {
        dispatch(this.act(CRUDAct.RESET_FORM, false))
        dispatch(this.act(CRUDAct.SELECT_CREATED_FK_RECORD, true))
        dispatch(push(`${pathname}/create-exercise`))
      }}
    />)
  }
}
export default MatchExerciseFormContainer
