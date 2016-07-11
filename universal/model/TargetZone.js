import OsnovaModel from './OsnovaModel'
import TargetZoneSchema from "../schema/TargetZoneSchema"
import {Model} from "objection"

export default class TargetZone extends OsnovaModel {
  static tableName = 'target_zone'
  static jsonSchema = TargetZoneSchema

  static relationMappings = {
    target: {
      relation: Model.BelongsToOneRelation,
      modelClass: __dirname + '/Target',
      join: {
        from: 'target_zone.targetId',
        to: 'target.id'
      }
    }
  }
}