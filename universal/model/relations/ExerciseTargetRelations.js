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
  match_exercise_target_zone: {
    relation: 'HasMany',
    modelClass: 'MatchExerciseTargetZone',
    join: {
      fromTable: 'exercise_target',
      fromField: 'id',
      toTable: 'match_exercise_target_zone',
      toField: 'exerciseTargetId'
    }
  }
}
export default ExerciseTargetRelations
