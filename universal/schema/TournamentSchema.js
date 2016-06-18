const TournamentSchema = {
  type: 'object',
  required: ['name'],

  properties: {
    id: {type: 'integer'},
    name: {type: 'string', minLength: 10, maxLength: 255},
    description: {type: 'string', maxLength: 255},

    notes: {
      type: ['object', 'null'],
      properties: {
        note: {type: 'string', minLength: 1}
      }
    }
  }
};
export default TournamentSchema;
