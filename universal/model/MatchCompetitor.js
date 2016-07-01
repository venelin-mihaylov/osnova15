import OsnovaModel from './OsnovaModel'
import MatchCompetitorSchema from "../schema/MatchCompetitorSchema"
import {Model} from "objection"

export default class MatchCompetitor extends OsnovaModel {
  static tableName = 'match_competitor'
  //static jsonSchema = MatchCompetitorSchema

  static relationMappings = {
    match: {
      relation: Model.BelongsToOneRelation,
      modelClass: __dirname + '/Match',
      join: {
        from: 'match_competitor.matchId',
        to: 'matches.id'
      }
    },
    competitor: {
      relation: Model.BelongsToOneRelation,
      modelClass: __dirname + '/Competitor',
      join: {
        from: 'match_competitor.competitorId',
        to: 'competitor.id'
      }
    }
  }
}