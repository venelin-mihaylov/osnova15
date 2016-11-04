const MatchCompetitorRelations = {
  match: {
    relation: 'BelongsToOne',
    modelClass: 'Match',
    join: {
      fromTable: 'match_competitor',
      fromField: 'matchId',
      toTable: 'matches',
      toField: 'id'
    }
  },
  competitor: {
    relation: 'BelongsToOne',
    modelClass: 'Competitor',
    join: {
      fromTable: 'match_competitor',
      fromField: 'competitorId',
      toTable: 'competitor',
      toField: 'id'
    }
  }
}
export default MatchCompetitorRelations
