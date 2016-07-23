import OsnovaModel from './OsnovaModel'
import ExerciseSchema from "../model/schema/ExerciseSchema"
import {Model} from "objection"

export default class Exercise extends OsnovaModel {
  static tableName = 'exercise'
  static jsonSchema = ExerciseSchema

  static relationMappings = {
    exercise_target: {
      relation: Model.HasManyRelation,
      modelClass: __dirname + '/ExerciseTarget',
      join: {
        from: 'exercise.id',
        to: 'exercise_target.exerciseId'
      }
    }
  }
}