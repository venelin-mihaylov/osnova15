const ExerciseRelations = {
  exercise_target: {
    relation: 'HasMany',
    modelClass: 'ExerciseTarget',
    join: {
      fromTable: 'exercise',
      fromField: 'id',
      toTable: 'exercise_target',
      toField: 'exerciseId'
    }
  },
  match_exercise_target_zone: {
    relation: 'HasMany',
    modelClass: 'MatchExerciseTargetZone',
    join: {
      fromTable: 'exercise',
      fromField: 'id',
      toTable: 'match_exercise_target_zone',
      toField: 'exerciseId'
    }
  }
}
export default ExerciseRelations
