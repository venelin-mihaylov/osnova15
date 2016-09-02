const ExerciseTargetSchema = {
  type: 'object',
  required: ['targetId', 'distance', 'weight', 'score'],
  properties: {
    id: {type: 'integer'},
    exerciseId: {type: 'integer'},
    targetId: {type: 'integer', labelField: 'name'},
    distance: {type: 'number'},
    weight: {type: 'number'},
    score: {type: 'integer'},
    description: {type: 'string'}
  }
}
export default ExerciseTargetSchema
