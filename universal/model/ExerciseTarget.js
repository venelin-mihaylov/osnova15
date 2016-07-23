import OsnovaModel from './OsnovaModel'
import ExerciseTargetSchema from "../model/schema/ExerciseTargetSchema"
import {Model} from "objection"

export default class ExercisEeTarget extends OsnovaModel {
  static tableName = 'exercise_target'
  static jsonSchema = ExerciseTargetSchema

  static relationMappings = {
    exercise: {
      relation: Model.BelongsToOneRelation,
      modelClass: __dirname + '/Exercise',
      join: {
        from: 'exercise_target.exerciseId',
        to: 'exercise.id'
      }
    },
    target: {
      relation: Model.BelongsToOneRelation,
      modelClass: __dirname + '/Target',
      join: {
        from: 'exercise_target.targetId',
        to: 'target.id'
      }
    }
  }
}