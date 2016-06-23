import OsnovaModel from './OsnovaModel'
import {Model} from "objection"
import MatchSchema from "../schema/MatchSchema"


export default class Match extends OsnovaModel {
  static tableName = 'matches'
  static jsonSchema = MatchSchema

  static relationMappings = {
    Tournament: {
      relation: Model.BelongsToOneRelation,
      modelClass: __dirname + '/Tournament',
      join: {
        from: 'matches.tournament_id',
        to: 'tournament.id'
      }
    }
  }
}