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
    match_competitor: {
      relation: Model.HasManyRelation,
      modelClass: __dirname + '/MatchCompetitor',
      join: {
        from: 'matches.id',
        to: 'match_competitor.matchId'
      }
    }
  }
}