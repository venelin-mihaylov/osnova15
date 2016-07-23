import OsnovaModel from './OsnovaModel'
import TargetSchema from "../model/schema/TargetSchema"
import TargetRelations from './relations/TargetRelations'
import {toObjectionRelations} from './util/util'

export default class Target extends OsnovaModel {
  static tableName = 'target'
  static jsonSchema = TargetSchema
  static relationMappings = toObjectionRelations(TargetRelations)
}