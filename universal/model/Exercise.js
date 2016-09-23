import OsnovaModel from './OsnovaModel'
import ExerciseSchema from './schema/ExerciseSchema'
import ExerciseRelations from './relations/ExerciseRelations'
import {toObjectionRelations} from './util/util'

export default class Exercise extends OsnovaModel {
  static tableName = 'exercise'
  static jsonSchema = ExerciseSchema
  static relationMappings = toObjectionRelations(ExerciseRelations)
}
