import OsnovaModel from './OsnovaModel'
import ExerciseTargetSchema from "./schema/ExerciseTargetSchema"
import ExerciseTargetRelations from './relations/ExerciseTargetRelations'
import {Model} from "objection"
import {toObjectionRelations} from './util/util'

export default class ExerciseTarget extends OsnovaModel {
  static tableName = 'exercise_target'
  static jsonSchema = ExerciseTargetSchema

  static relationMappings = toObjectionRelations(ExerciseTargetRelations)
}