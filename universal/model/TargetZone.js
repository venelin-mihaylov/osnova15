import OsnovaModel from './OsnovaModel'
import TargetZoneSchema from "../schema/TargetZoneSchema"
import {Model} from "objection"

export const tableName = 'target_zone'
export const relationMappings = {
  target: {
    relation: Model.BelongsToOneRelation,
    modelClass: __dirname + '/Target',
    join: {
      from: 'target_zone.targetId',
      to: 'target.id'
    }
  }
}

export default class TargetZone extends OsnovaModel {
  static tableName = tableName
  static jsonSchema = TargetZoneSchema

  static relationMappings = relationMappings
}