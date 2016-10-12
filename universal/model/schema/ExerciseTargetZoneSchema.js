const ExerciseTargetZoneSchema = {
  type: 'object',
  required: ['weight', 'score'],
  properties: {
    id: {type: 'integer'},
    exerciseTargetId: {type: 'integer'},
    targetId: {type: 'integer'},
    zoneId: {type: 'integer'},
    weight: {type: 'number'},
    score: {type: 'integer'}
  }
}
export default ExerciseTargetZoneSchema
