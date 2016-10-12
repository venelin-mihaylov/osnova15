const ExerciseTargetZoneSchema = {
  type: 'object',
  required: ['weight', 'score'],
  properties: {
    id: {type: 'integer'},
    exerciseTargetId: {type: 'integer'},
    targetName: {type: 'string'},
    zoneName: {type: 'string'},
    targetId: {type: 'integer'},
    zoneId: {type: 'integer'},
    height: {type: 'integer'},
    width: {type: 'integer'},
    distance: {type: 'integer'},
    weight: {type: 'number'},
    score: {type: 'integer'}
  }
}
export default ExerciseTargetZoneSchema
