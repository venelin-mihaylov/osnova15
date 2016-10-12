import React from 'react'
import {connect} from 'react-redux'
import {autobind} from 'core-decorators'
import EntityFormWrapper from 'components/EntityFormWrapper'
import ExerciseTargetZoneFormFields from 'modules/exerciseTargetZone/components/ExerciseTargetZoneFormFields'
import OsnovaFormContainer from 'components/OsnovaFormContainer.js'
import {mapAct, rrfModel, mapCrudStateToProps} from 'utils/Util'
import get from 'lodash/get'
import pick from 'lodash/pick'
import CRUDAct from 'constants/CRUDAct'
import {actions} from 'react-redux-form'

const entity = 'exerciseTargetZone'
const variation = '1'

@connect(mapCrudStateToProps(entity, variation, state => ({
  model: get(state, rrfModel(entity))
})), mapAct(entity, variation))
@autobind
export default class ExerciseTargetZoneFormContainer extends OsnovaFormContainer {
  onSubmit(model) {
    const records = model.map(r => ({
      exerciseId: this.props.params.exerciseId,
      ...r,
    }))
    super.onUpdate(null, {records})
  }

  readServerRecord() {
    this.props.act(CRUDAct.LIST_SET_FILTER, {
      value: {
        exerciseId: this.props.params.exerciseId
      }
    })
    this.props.promiseAct(CRUDAct.LIST_REQUESTED)
      .then(records => {
        const records2 = records.map(r => pick(r, [
          'id',
          'targetName',
          'zoneName',
          'weight',
          'score'
        ]))
        this.props.dispatch(actions.reset(rrfModel(entity)))
        this.props.dispatch(actions.load(rrfModel(entity), records2))
      })
  }

  render() {
    return (<EntityFormWrapper
      FormFieldsComponent={ExerciseTargetZoneFormFields}
      {...this.props}
      {...(this.addProps())}
    />)
  }
}
