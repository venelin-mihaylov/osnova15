import OsnovaModel from './OsnovaModel'
import TargetSchema from "../schema/TargetSchema"
import {Model} from "objection"

export default class Target extends OsnovaModel {
  static tableName = 'target'
  static jsonSchema = TargetSchema

  static relationMappings = {
    target_zone: {
      relation: Model.HasManyRelation,
      modelClass: __dirname + '/TargetZone',
      join: {
        from: 'target.id',
        to: 'target_zone.targetId'
      }
    }
  }

}