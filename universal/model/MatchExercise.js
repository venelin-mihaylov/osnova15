import OsnovaModel from './OsnovaModel'
import MatchExerciseSchema from "../schema/MatchExerciseSchema"
import {Model} from "objection"

export default class MatchExercise extends OsnovaModel {
  static tableName = 'match_exercise'
  static jsonSchema = MatchExerciseSchema

  static relationMappings = {
    match: {
      relation: Model.BelongsToOneRelation,
      modelClass: __dirname + '/Match',
      join: {
        from: 'match_exercise.matchId',
        to: 'matches.id'
      }
    },
    exercise: {
      relation: Model.BelongsToOneRelation,
      modelClass: __dirname + '/Exercise',
      join: {
        from: 'match_exercise.exerciseId',
        to: 'exercise.id'
      }
    }
  }
}