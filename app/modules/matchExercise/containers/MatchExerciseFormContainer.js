import React from 'react'
import {connect} from 'react-redux'
import {autobind} from 'core-decorators'
import EntityFormWrapper from 'components/EntityFormWrapper'
import MatchExerciseFormFields from 'modules/MatchExercise/components/MatchExerciseFormFields'
import OsnovaFormContainer from 'components/OsnovaFormContainer.js'
import CRUDAct from 'constants/CRUDAct'
import {push} from 'react-router-redux'
import {rrfModel, mapAct, mapCrudStateToProps, selectCreatedFK, crudStatePath, rrfSetValid2} from 'utils/Util'
import ExerciseSchema from '../../../../universal/model/schema/ExerciseSchema'
import get from 'lodash/get'

const entity = 'exercise'
const variation = '1'

@connect(mapCrudStateToProps(entity, variation, state => ({
  fkRecord: state[crudStatePath('target')].savedRecord,
  model: get(state, rrfModel(entity))
})), mapAct(entity, variation))
@autobind
export default class MatchExerciseFormContainer extends OsnovaFormContainer {
  componentWillMount() {
    super.componentWillMount()

    selectCreatedFK({
      dispatch: this.props.dispatch,
      entity: this.props.entity,
      variation: this.props.variation,
      select: this.props.redux.selectCreatedFK,
      fkParams: [{
        fkEntity: 'target',
        fkRecord: this.props.fkRecord,
        fkFieldName: this.props.redux.selectCreatedFK ? this.props.redux.selectCreatedFK.fkFieldName : null,
        relationType: 'belongsToOne'
      }]
    })
  }

  onSubmit(record) {
    super.onSubmit({
      ...record,
      matchId: this.props.params.matchId,
    })
  }

  postLoadModel() {
    rrfSetValid2({
      dispatch: this.props.dispatch,
      entity: this.props.entity,
      schema: ExerciseSchema,
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
      onClickAddTarget={fkFieldName => () => {
        this.props.act(CRUDAct.RESET_FORM, false)
        this.props.act(CRUDAct.SELECT_CREATED_FK_RECORD, {value: {fkFieldName}})
        dispatch(push(`${pathname}/create-target`))
      }}
    />)
  }
}
