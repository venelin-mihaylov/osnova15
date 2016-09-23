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
  }
}
export default ExerciseRelations
