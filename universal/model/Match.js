import OsnovaModel from './OsnovaModel'
import MatchSchema from "../model/schema/MatchSchema"
import MatchRelations from './relations/MatchRelations'
import {toObjectionRelations} from './util/util'

export default class Match extends OsnovaModel {
  static tableName = 'matches'
  static jsonSchema = MatchSchema

  static relationMappings = toObjectionRelations(MatchRelations)
}