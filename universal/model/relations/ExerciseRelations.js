const ExerciseRelations = {
  match_exercise: {
    relation: 'HasMany',
    modelClass: 'MatchExerciseTargetZone',
    join: {
      fromTable: 'exercise',
      fromField: 'id',
      toTable: 'match_exercise',
      toField: 'exerciseId'
    }
  },
  exercise_target: {
    relation: 'HasMany',
    modelClass: 'ExerciseTarget',
    join: {
      fromTable: 'exercise',
      fromField: 'id',
      toTable: 'exercise_target',
      toField: 'exerciseId'
    }
  }
}
export default ExerciseRelations