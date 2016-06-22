import OsnovaModel from './OsnovaModel';
import TournamentSchema from "../schema/TournamentSchema";
import {Model} from "objection";

export default class Tournament extends OsnovaModel {
  static tableName = 'tournament';
  static jsonSchema = TournamentSchema;

  static relationMappings = {
    matches: {
      relation: Model.HasManyRelation,
      modelClass: __dirname + '/Match',
      join: {
        from: 'tournament.id',
        to: 'matches.tournament_id'
      }
    }
  }

}