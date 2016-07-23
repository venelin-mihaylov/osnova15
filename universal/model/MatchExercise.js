import OsnovaModel from './OsnovaModel'
import MatchExerciseSchema from "./schema/MatchExerciseSchema"
import MatchExerciseRelations from './relations/MatchCompetitorRelations'
import {toObjectionRelations} from './util/util'

export default class MatchExercise extends OsnovaModel {
  static tableName = 'match_exercise'
  static jsonSchema = MatchExerciseSchema
  static relationMappings = toObjectionRelations(MatchExerciseRelations)
}