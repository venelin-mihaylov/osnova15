const MatchExerciseTargetZoneSchema = {
  type: 'object',
  required: ['weight', 'score'],
  properties: {
    id: {type: 'integer'},
    exerciseTargetId: {type: 'integer'},
    exerciseId: {type: ['null', 'integer']},
    matchId: {type: ['null', 'integer']},
    targetId: {type: 'integer'},
    zoneId: {type: 'integer'},
    weight: {type: 'integer'},
    score: {type: 'integer'}
  }
}
export default MatchExerciseTargetZoneSchema
