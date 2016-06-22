const MatchSchema = {
  type: 'object',
  required: ['name', 'tournamentID'],
  properties: {
    id: {type: 'integer'},
    name: {type: 'string', minLength: 10, maxLength: 255},
    tournament_id: {type: 'integer'}
  }
};
export default MatchSchema;
