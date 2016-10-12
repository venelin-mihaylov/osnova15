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
  exercise_target_zone: {
    relation: 'HasMany',
    modelClass: 'ExerciseTargetZone',
    join: {
      fromTable: 'exercise',
      fromField: 'id',
      toTable: 'exercise_target_zone',
      toField: 'exerciseId'
    }
  }
}
export default ExerciseRelations
