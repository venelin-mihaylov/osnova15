import React from 'react'
import {connect} from 'react-redux'
import {autobind} from 'core-decorators'
import EntityFormWrapper from 'components/EntityFormWrapper'
import MatchExerciseTargetZoneFormFields from 'modules/matchExerciseTargetZone/components/MatchExerciseTargetZoneFormFields'
import OsnovaFormContainer from 'components/OsnovaFormContainer.js'
import {mapAct, mapCrudStateToProps, rrfModel, rrfSetValidAndPristine} from 'utils/Util'
import get from 'lodash/get'
import CRUDAct from 'constants/CRUDAct'
import {actions} from 'react-redux-form'

const entity = 'matchExerciseTargetNode'
const variation = '1'

@connect(mapCrudStateToProps(entity, variation, state => ({
  model: get(state, rrfModel(entity))
})), mapAct(entity, variation))
@autobind
export default class MatchExerciseTargetZoneFormContainer extends OsnovaFormContainer {

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

  readServerRecord() {
    this.props.act(CRUDAct.LIST_SET_FILTER, {
      matchId: this.props.params.matchId,
      exerciseId: this.props.params.exerciseId
    })
    this.props.promiseAct(CRUDAct.LIST_REQUESTED)
      .then(records => {
        this.props.dispatch(actions.load(rrfModel(entity), records))
        rrfSetValidAndPristine({
          dispatch: this.props.dispatch,
          entity: this.props.entity,
          records
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
