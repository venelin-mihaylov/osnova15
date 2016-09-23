import OsnovaModel from './OsnovaModel'
import MatchExerciseTargetZoneSchema from './schema/MatchExerciseTargetZoneSchema'
import MatchExerciseTargetZoneRelations from './relations/MatchExerciseTargetZoneRelations'
import {toObjectionRelations} from './util/util'

export default class MatchExerciseTargetZone extends OsnovaModel {
  static tableName = 'match_exercise_target_zone'
  static jsonSchema = MatchExerciseTargetZoneSchema
  static relationMappings = toObjectionRelations(MatchExerciseTargetZoneRelations)
}
