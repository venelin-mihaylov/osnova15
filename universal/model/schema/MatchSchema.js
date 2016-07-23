const MatchSchema = {
  type: 'object',
  required: ['name', 'tournamentId'],
  properties: {
    id: {type: 'integer'},
    name: {type: 'string', minLength: 10, maxLength: 255},
    tournamentId: {type: 'integer', labelField: "name"},
    notes: {
      type: ['array', 'object', 'null'],
      required: ['text'],
      properties: {
        text: {type: 'string'}
      }
    }
  }
}
export default MatchSchema
