import React from 'react'
import {connect} from 'react-redux'
import {autobind} from 'core-decorators'
import EntityFormWrapper from 'components/EntityFormWrapper'
import MatchExerciseTargetZoneFormFields from 'modules/matchExerciseTargetZone/components/MatchExerciseTargetZoneFormFields'
import OsnovaFormContainer from 'components/OsnovaFormContainer.js'
import {mapAct, rrfModel, rrfSetValidAndPristine, mapCrudStateToProps} from 'utils/Util'
import get from 'lodash/get'
import pick from 'lodash/pick'
import CRUDAct from 'constants/CRUDAct'
import {actions} from 'react-redux-form'

const entity = 'matchExerciseTargetZone'
const variation = '1'

@connect(mapCrudStateToProps(entity, variation, state => ({
  model: get(state, rrfModel(entity))
})), mapAct(entity, variation))
@autobind
export default class MatchExerciseTargetZoneFormContainer extends OsnovaFormContainer {
  onSubmit(model) {
    const records = model.map(r => ({
      matchId: this.props.params.matchId,
      exerciseId: this.props.params.exerciseId,
      ...r,
    }))
    super.onUpdate(null, {records})
  }

  readServerRecord() {
    this.props.act(CRUDAct.LIST_SET_FILTER, {
      value: {
        matchId: this.props.params.matchId,
        exerciseId: this.props.params.exerciseId
      }
    })
    this.props.promiseAct(CRUDAct.LIST_REQUESTED)
      .then(records => {
        const records2 = records.map(r => pick(r, [
          'id',
          'zoneName',
          'weight',
          'score'
        ]))
        this.props.dispatch(actions.load(rrfModel(entity), records2))
        rrfSetValidAndPristine({
          dispatch: this.props.dispatch,
          entity: this.props.entity,
          record: records2
        })
      })
  }

  render() {
    return (<EntityFormWrapper
      FormFieldsComponent={MatchExerciseTargetZoneFormFields}
      {...this.props}
      {...(this.addProps())}
    />)
  }
}
