const MatchRelations = {
  tournament: {
    relation: 'BelongsToOne',
    modelClass:  'Tournament',
    join: {
      fromTable: 'matches',
      fromField: 'tournamentId',
      toTable: 'tournament',
      toField: 'id',
    }
  },
  match_competitor: {
    relation: 'HasMany',
    modelClass: 'MatchCompetitor',
    join: {
      fromTable: 'matches',
      fromField: 'id',
      toTable: 'match_competitor',
      toField: 'matchId'
    }
  }
}
export default MatchRelations