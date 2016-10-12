const ExerciseTargetRelations = {
  exercise: {
    relation: 'BelongsToOne',
    modelClass: 'Exercise',
    join: {
      fromTable: 'exercise_target',
      fromField: 'exerciseId',
      toTable: 'exercise',
      toField: 'id'
    }
  },
  target: {
    relation: 'BelongsToOne',
    modelClass: 'Target',
    join: {
      fromTable: 'exercise_target',
      fromField: 'targetId',
      toTable: 'target',
      toField: 'id'
    }
  },
  exercise_target_zone: {
    relation: 'HasMany',
    modelClass: 'ExerciseTargetZone',
    join: {
      fromTable: 'exercise_target',
      fromField: 'id',
      toTable: 'exercise_target_zone',
      toField: 'exerciseTargetId'
    }
  }
}
export default ExerciseTargetRelations
