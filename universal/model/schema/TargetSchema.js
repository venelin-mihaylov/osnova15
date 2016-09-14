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
        1: 'Test',
        2: 'Test 2'
      }
    },
    favourite: {type: 'boolean'},
    thumbnail: {type: 'string', noForm: true},
    image: {type: 'string'},
  }
}
export default TargetSchema
