const ExerciseTargetSchema = {
  type: 'object',
  required: ['targetId', 'distance'],
  properties: {
    id: {type: 'integer'},
    exerciseId: {type: 'integer'},
    targetId: {type: 'integer', labelField: 'name'},
    distance: {type: 'integer'},
    metric: {
      type: 'integer',
      enum: [1, 2],
      enumProps: {
        1: 'meters',
        2: 'yards'
      },
      defaultValue: 1
    },
    description: {type: 'string'}
  }
}
export default ExerciseTargetSchema
