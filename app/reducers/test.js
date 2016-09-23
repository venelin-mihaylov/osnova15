import {actions} from 'react-redux-form'
import {rrfModel, rrfField} from 'utils/Util'

export default function test(state = {
  name: 'alabala1234'
}, action = {}) { // eslint-disable-line
  const {
    type,
    ...act
  } = action

  const entity = 'test'
  switch (type) {
    case 'rrf/change':
      if (act.model === rrfField(entity, 'tournamentId')) {
        return Object.assign({}, state, {
          name: act.value * 1023
        })
      }
      return state
    default:
      return state
  }
}
