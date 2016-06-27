import OsnovaModel from './OsnovaModel'
import {Model} from "objection"
import MatchSchema from "../schema/MatchSchema"


export default class Match extends OsnovaModel {
  static tableName = 'matches'
  static jsonSchema = MatchSchema

  static relationMappings = {
    tournament: {
      relation: Model.BelongsToOneRelation,
      modelClass: __dirname + '/Tournament',
      join: {
        from: 'matches.tournamentId',
        to: 'tournament.id'
      }
    },
    competitor_match: {
      relation: Model.HasManyRelation,
      modelClass: __dirname + '/CompetitorMatch',
      join: {
        from: 'matches.id',
        to: 'competitor_match.matchId'
      }
    }
  }
}