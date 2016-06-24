import OsnovaModel from './OsnovaModel'
import CompetitorSchema from "../schema/CompetitorSchema"
import {Model} from "objection"

export default class Competitor extends OsnovaModel {
  static tableName = 'competitor'
  static jsonSchema = CompetitorSchema

}