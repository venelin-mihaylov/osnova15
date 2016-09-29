import {rrfModel} from 'utils/Util'
import {targetZoneScore} from '../../universal/scoring/scoring'
import find from 'lodash/find'
import get from 'lodash/get'
import i from 'icepick'

const setScoreOnWeightChange = function (entity, model, value, state) {
  const regex = `${rrfModel(entity)}\\[(\\d+)\\].*weight`
  const match = model.match(new RegExp(regex))
  if (match) {
    const idx = match[1]
    const cur = get(state, model)
    if (cur !== value) {
      const score = targetZoneScore(100, 100, value)
      return i.assocIn(state, [idx, 'score'], score)
    }
  }
  return state
}

export default function matchExerciseTargetZone(state = [], action = {}) { // eslint-disable-line
  const {
    type,
    model,
    value,
    ...act
  } = action

  let change = null

  const entity = 'matchExerciseTargetZone'
  switch (type) {
    case 'rrf/change':
      return setScoreOnWeightChange(entity, model, value, state)
    case 'rrf/batch':
      change = find(act.actions, {type: 'rrf/change'})
      if (change) {
        return matchExerciseTargetZone(state, change)
      }
      return state
    default:
      return state
  }
}
