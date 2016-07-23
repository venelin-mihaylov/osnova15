const MatchExerciseSchema = {
  type: 'object',
  required: ['exerciseId', 'matchId'],
  properties: {
    id: {type: 'integer'},
    exerciseId: {type: 'integer'},
    matchId: {type: 'integer'}
  }
}
export default MatchExerciseSchema
