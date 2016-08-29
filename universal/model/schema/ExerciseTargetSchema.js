const ExerciseTargetSchema = {
  type: 'object',
  required: ['targetId', 'distance', 'description'],
  properties: {
    id: {type: 'integer'},
    exerciseId: {type: 'integer'},
    targetId: {type: 'integer', labelField: 'name'},
    distance: {type: 'number'},
    weight: {type: 'number'},
    score: {type: 'integer', label: 'Score123'},
    description: {type: 'string'}
  }
}
export default ExerciseTargetSchema
