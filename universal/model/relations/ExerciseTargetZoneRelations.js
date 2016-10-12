const ExerciseTargetZoneRelations = {
  match: {
    relation: 'BelongsToOne',
    modelClass: 'Match',
    join: {
      fromTable: 'exercise_target_zone',
      fromField: 'matchId',
      toTable: 'matches',
      toField: 'id'
    }
  },
  exercise: {
    relation: 'BelongsToOne',
    modelClass: 'Exercise',
    join: {
      fromTable: 'exercise_target_zone',
      fromField: 'exerciseId',
      toTable: 'exercise',
      toField: 'id'
    }
  },
  exercise_target: {
    relation: 'BelongsToOne',
    modelClass: 'ExerciseTarget',
    join: {
      fromTable: 'exercise_target_zone',
      fromField: 'exerciseTargetId',
      toTable: 'exercise_target',
      toField: 'id'
    }
  },
  target: {
    relation: 'BelongsToOne',
    modelClass: 'Target',
    join: {
      fromTable: 'exercise_target_zone',
      fromField: 'exerciseId',
      toTable: 'target',
      toField: 'id'
    }
  },
  target_zone: {
    relation: 'BelongsToOne',
    modelClass: 'TargetZone',
    join: {
      fromTable: 'exercise_target_zone',
      fromField: 'exerciseId',
      toTable: 'target_zone',
      toField: 'id'
    }
  }
}
export default ExerciseTargetZoneRelations
