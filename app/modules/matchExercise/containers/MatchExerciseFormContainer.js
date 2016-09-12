import React from 'react'
import {connect} from 'react-redux'
import {autobind} from 'core-decorators'
import EntityFormWrapper from 'components/EntityFormWrapper'
import MatchExerciseFormFields from 'modules/matchExercise/components/MatchExerciseFormFields'
import OsnovaFormContainer from 'components/OsnovaFormContainer'
import {push} from 'react-router-redux'
import CRUDAct from 'constants/CRUDAct'
import {mapAct, mapCrudStateToProps, crudStatePath, selectCreatedFK} from 'utils/Util'

const entity = 'matchExercise'
const variation = '1'

@connect(mapCrudStateToProps(entity, variation, state => ({
  fkRecord: state[crudStatePath('exercise')].savedRecord
})), mapAct(entity, variation))
@autobind
class MatchExerciseFormContainer extends OsnovaFormContainer {

  componentWillMount() {
    super.componentWillMount()

    selectCreatedFK({
      dispatch: this.props.dispatch,
      entity: this.props.entity,
      variation: this.props.variation,
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
