const ExerciseTargetSchema = {
  type: 'object',
  required: ['targetId', 'distance', 'metric', 'gunType'],
  properties: {
    id: {type: 'integer'},
    exerciseId: {type: 'integer'},
    targetId: {type: 'integer', labelField: 'name'},
    distance: {type: 'integer'},
    gunType: {
      type: 'integer',
      enum: [1, 2, 3],
      enumProps: {
        1: 'sniper rifle',
        2: 'semi auto',
        3: 'gun'
      },
      defaultValue: 1
    },
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
