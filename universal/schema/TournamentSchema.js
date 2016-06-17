const TournamentSchema = {
  type: 'object',
  required: ['name', 'description'],

  properties: {
    id: {type: 'integer'},
    name: {type: 'string', maxLength: 255},
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
