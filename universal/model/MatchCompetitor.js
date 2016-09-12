import OsnovaModel from './OsnovaModel'
import MatchCompetitorSchema from './schema/MatchCompetitorSchema'
import MatchCompetitorRelations from './relations/MatchCompetitorRelations'
import {toObjectionRelations} from './util/util'

export default class MatchCompetitor extends OsnovaModel {
  static tableName = 'match_competitor'
  static jsonSchema = MatchCompetitorSchema
  static relationMappings = toObjectionRelations(MatchCompetitorRelations)
}