const MatchCompetitorSchema = {
  type: 'object',
  required: ['competitorId', 'matchId'],
  properties: {
    id: {type: 'integer'},
    matchId: {type: 'integer'},
    competitorId: {type: 'integer'},
    num: {type: 'integer'},
    squad: {type: 'integer'},
    division: {
      type: 'integer',
      enum: [1, 2, 3],
      enumProps: {
        1: 'Division 1',
        2: 'Division 2',
        3: 'Division alabala'
      }
    },
    caliber: {type: 'number'},
    gun: {type: 'string'},
    team: {type: 'string'},
    gunChecked: {type: 'boolean'},
    feePaid: {type: 'boolean'},
    disqualified: {type: 'boolean'},
    notes: {type: 'string'}
  }
}
export default MatchCompetitorSchema
