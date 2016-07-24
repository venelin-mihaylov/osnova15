const ExerciseTargetSchema = {
  type: 'object',
  required: ['exerciseId', 'targetId', 'distance', 'description'],
  properties: {
    id: {type: 'integer'},
    exerciseId: {type: 'integer'},
    targetId: {type: 'integer', labelField: 'name'},
    distance: {type: 'number'},
    description: {type: 'string'}
  }
}
export default ExerciseTargetSchema
