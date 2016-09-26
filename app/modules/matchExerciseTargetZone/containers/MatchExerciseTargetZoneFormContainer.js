import React from 'react'
import {connect} from 'react-redux'
import {autobind} from 'core-decorators'
import EntityFormWrapper from 'components/EntityFormWrapper'
import MatchExerciseTargetZoneFormFields from 'modules/matchExerciseTargetZone/components/MatchExerciseTargetZoneFormFields'
import OsnovaFormContainer from 'components/OsnovaFormContainer.js'
import {mapAct, mapCrudStateToProps, rrfModel} from 'utils/Util'
import get from 'lodash/get'

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

  render() {
    return (<EntityFormWrapper
      FormFieldsComponent={MatchExerciseTargetZoneFormFields}
      {...this.props}
      {...(this.addProps())}
    />)
  }
}
