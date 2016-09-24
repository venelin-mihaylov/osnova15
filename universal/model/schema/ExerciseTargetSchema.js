const ExerciseTargetSchema = {
  type: 'object',
  required: ['targetId', 'distance'],
  properties: {
    id: {type: 'integer'},
    exerciseId: {type: 'integer'},
    targetId: {type: 'integer', labelField: 'name'},
    distance: {type: 'integer'},
    description: {type: 'string'}
  }
}
export default ExerciseTargetSchema
