import OsnovaModel from './OsnovaModel'
import CompetitorMatchSchema from "../schema/CompetitorMatchSchema"
import {Model} from "objection"

export default class CompetitorMatch extends OsnovaModel {
  static tableName = 'competitor_match'
  //static jsonSchema = CompetitorMatchSchema

  static relationMappings = {
    match: {
      relation: Model.BelongsToOneRelation,
      modelClass: __dirname + '/Match',
      join: {
        from: 'competitor_match.matchId',
        to: 'matches.id'
      }
    },
    competitor: {
      relation: Model.BelongsToOneRelation,
      modelClass: __dirname + '/Competitor',
      join: {
        from: 'competitor_match.competitorId',
        to: 'competitor.id'
      }
    }
  }
}