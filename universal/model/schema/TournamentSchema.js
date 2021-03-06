const TournamentSchema = {
  type: 'object',
  required: ['name'],

  properties: {
    id: {type: 'integer'},
    name: {type: 'string', minLength: 10, maxLength: 255},
    description: {type: ['string', 'null'], maxLength: 255},
    type: {
      type: 'integer',
      enum: [1, 2],
      enumProps: {
        1: 'Test',
        2: 'Test 2'
      }
    },
  }
}
export default TournamentSchema
