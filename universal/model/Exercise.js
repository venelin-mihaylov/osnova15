import OsnovaModel from './OsnovaModel'
import ExerciseSchema from "../schema/ExerciseSchema"
import {Model} from "objection"

export default class Exercise extends OsnovaModel {
  static tableName = 'exercise'
  static jsonSchema = ExerciseSchema

}