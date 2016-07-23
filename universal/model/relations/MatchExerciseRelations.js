const MatchExerciseRelations = {
  match: {
    relation: 'BelongsToOne',
    modelClass: 'Match',
    join: {
      fromTable: 'match_exercise',
      fromField: 'matchId',
      toTable: 'match',
      toField: 'id'
    }
  },
  exercise: {
    relation: 'BelongsToOne',
    modelClass: 'Exercise',
    join: {
      fromTable: 'match_exercise',
      fromField: 'exerciseId',
      toTable: 'exercise',
      toField: 'id'
    }
  }
}
export default MatchExerciseRelations