const MatchCompetitorSchema = {
  type: 'object',
  required: ['competitorId', 'matchId', 'division', 'caliber', 'gun'],
  properties: {
    id: {type: 'integer'},
    matchId: {type: 'integer'},
    competitorId: {type: 'integer'},
    num: {type: ['integer', 'null']},
    squad: {type: ['integer', 'null']},
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
    notes: {type: 'string', uiControl: 'TextArea'},
    gunChecked: {type: 'boolean'},
    feePaid: {type: 'boolean'},
    disqualified: {type: 'boolean'},
  }
}
export default MatchCompetitorSchema
