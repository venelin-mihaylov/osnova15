import {actions} from 'react-redux-form'
import {rrfModel, rrfField} from 'utils/Util'

export default function exercise(state = {}, action = {}) { // eslint-disable-line
  const {
    type,
    ...act
  } = action

  const entity = 'exercise'

  console.log('exercise reducer')
  console.log(type)
  console.log(act)
  console.log(state)

  switch (type) {
    case 'rrf/change':
      if (act.model === rrfField(entity, 'exercise_target[0]targetId')) {
        console.log('have to add target zones')
        return state
      }
      return state
    default:
      return state
  }
}
