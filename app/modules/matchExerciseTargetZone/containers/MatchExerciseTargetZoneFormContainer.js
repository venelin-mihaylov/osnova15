import React from 'react'
import {connect} from 'react-redux'
import {autobind} from 'core-decorators'
import EntityFormWrapper from 'components/EntityFormWrapper'
import MatchExerciseTargetZoneFormFields from 'modules/matchExerciseTargetZone/components/MatchExerciseTargetZoneFormFields'
import OsnovaFormContainer from 'components/OsnovaFormContainer.js'
import {mapAct, mapCrudStateToProps} from 'utils/Util'

const entity = 'exercise'
const variation = '1'

@connect(mapCrudStateToProps(entity, variation), mapAct(entity, variation))
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
