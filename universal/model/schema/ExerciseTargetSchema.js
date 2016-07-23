const ExerciseTargetSchema = {
  type: 'object',
  required: ['exerciseId', 'targetId', 'distance', 'description'],
  properties: {
    id: {type: 'integer'},
    exerciseId: {type: 'integer'},
    targetId: {type: 'integer'},
    distance: {type: ['integer', 'string']},
    description: {type: 'string'}
  }
}
export default ExerciseTargetSchema
