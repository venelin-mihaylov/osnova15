const CompetitorMatchSchema = {
  type: 'object',
  required: ['competitorId', 'matchId'],
  properties: {
    id: {type: 'integer'},
    competitorId: {type: 'integer'},
    matchId: {type: 'integer'},
    is_disqualified: {type: 'boolean'}
  }
}
export default CompetitorMatchSchema
