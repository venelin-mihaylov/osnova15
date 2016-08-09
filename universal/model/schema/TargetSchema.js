const TargetSchema = {
  type: 'object',
  required: ['name'],

  properties: {
    id: {type: 'integer'},
    name: {type: 'string'},
    type: {
      type: 'integer',
      enum: [1, 2],
      enumProps: {
        '1': 'Test',
        '2': 'Test 2'
      }
    },
    weight: {type: 'number', defaultValue: 1},
    favourite: {type: 'boolean'},
    image: {type: 'string'},
  }
}
export default TargetSchema
