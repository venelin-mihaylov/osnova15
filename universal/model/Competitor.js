import OsnovaModel from './OsnovaModel'
import CompetitorSchema from "../model/schema/CompetitorSchema"

export default class Competitor extends OsnovaModel {
  static tableName = 'competitor'
  static jsonSchema = CompetitorSchema
}