import OsnovaModel from './OsnovaModel'
import TournamentSchema from '../model/schema/TournamentSchema'
import {Model} from 'objection'

export default class Tournament extends OsnovaModel {
  static tableName = 'tournament'
  static jsonSchema = TournamentSchema

  static relationMappings = {
    match: {
      relation: Model.HasManyRelation,
      modelClass: __dirname + '/Match',
      join: {
        from: 'tournament.id',
        to: 'matches.tournamentId'
      }
    }
  }

}