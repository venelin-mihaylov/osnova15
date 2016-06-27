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
        from: 'competitor_match.id',
        to: 'matches.id'
      }
    }
  }
}