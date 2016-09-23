import FKAct from 'constants/FKAct'
export default function rrfExercise(state = {
}, action = {}) { // eslint-disable-line
  const {
    type,
    model,
    value
  } = action
  if (type === 'rrf/change') {
    console.log('rrfExercise change')
    console.log(model)
    console.log(value)
    console.log(state)
  }

  return state
}
