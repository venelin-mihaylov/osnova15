const MatchCompetitorSchema = {
  type: 'object',
  required: ['competitorId', 'matchId'],
  properties: {
    id: {type: 'integer'},
    competitorId: {type: 'integer'},
    matchId: {type: 'integer'},
    disqualified: {type: 'boolean'}
  }
}
export default MatchCompetitorSchema
