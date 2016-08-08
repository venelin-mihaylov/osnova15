const ExerciseTargetSchema = {
  type: 'object',
  required: ['targetId', 'distance', 'description'],
  properties: {
    id: {type: 'integer'},
    exerciseId: {type: 'integer'},
    targetId: {type: 'integer', labelField: 'name'},
    distance: {type: 'number'},
    description: {type: 'string'}
  }
}
export default ExerciseTargetSchema
