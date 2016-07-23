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
  }
}
export default ExerciseTargetRelations