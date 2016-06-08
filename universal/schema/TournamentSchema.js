const TournamentJsonSchema = {
  type: 'object',
  required: ['name'],

  properties: {
    id: {type: 'integer'},
    name: {type: 'string', minLength: 1, maxLength: 255},
    notes: {
      type: 'object',
      properties: {
        note: {type: 'string', minLength: 1}
      }
    }
  }
};
export default TournamentJsonSchema;
