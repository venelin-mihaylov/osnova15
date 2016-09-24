const MatchExerciseTargetZoneSchema = {
  type: 'object',
  required: [],
  properties: {
    id: {type: 'integer'},
    exerciseTargetId: {type: 'integer'},
    exerciseId: {type: 'integer'},
    matchId: {type: 'integer'},
    targetId: {type: 'integer'},
    zoneId: {type: 'integer'},
    weight: {type: 'integer'},
    score: {type: 'integer'}
  }
}
export default MatchExerciseTargetZoneSchema
