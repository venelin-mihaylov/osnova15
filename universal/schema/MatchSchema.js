const MatchSchema = {
  type: 'object',
  required: ['name', 'tournament_id'],
  properties: {
    id: {type: 'integer'},
    name: {type: 'string', minLength: 10, maxLength: 255},
    tournament_id: {type: 'integer'},
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
