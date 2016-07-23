import OsnovaModel from './OsnovaModel'
import TargetZoneSchema from "./schema/TargetZoneSchema"
import TargetZoneRelations from './relations/TargetZoneRelations'
import {toObjectionRelations} from './util/util'

export default class TargetZone extends OsnovaModel {
  static tableName = 'target_zone'
  static jsonSchema = TargetZoneSchema
  static relationMappings = toObjectionRelations(TargetZoneRelations)
}