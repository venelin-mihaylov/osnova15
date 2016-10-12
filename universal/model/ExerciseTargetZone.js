import OsnovaModel from './OsnovaModel'
import ExerciseTargetZoneSchema from './schema/ExerciseTargetZoneSchema'
import ExerciseTargetZoneRelations from './relations/ExerciseTargetZoneRelations'
import {toObjectionRelations} from './util/util'

export default class ExerciseTargetZone extends OsnovaModel {
  static tableName = 'exercise_target_zone'
  static jsonSchema = ExerciseTargetZoneSchema
  static relationMappings = toObjectionRelations(ExerciseTargetZoneRelations)
}
