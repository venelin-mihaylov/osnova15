import {rrfModel, rrfField} from 'utils/Util'
import {targetZoneScore} from '../../universal/scoring/scoring'
import find from 'lodash/find'
import get from 'lodash/get'
import clone from 'lodash/clone'
import i from 'icepick'

export default function matchExerciseTargetZone(state = [], action = {}) { // eslint-disable-line
  const {
    type,
    model,
    value,
    ...act
  } = action

  const entity = 'matchExerciseTargetZone'
  switch (type) {
    case 'rrf/change':
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
    case 'rrf/batch':
      const change = find(act.actions, {type: 'rrf/change'})
      if (change) {
        return matchExerciseTargetZone(state, change)
      }
      return state
    default:
      return state
  }
}
