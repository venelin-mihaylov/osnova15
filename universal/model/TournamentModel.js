import OsnovaModel from './OsnovaModel';
import TournamentSchema from "../schema/TournamentSchema";
import {Model} from "objection";

export default class TournamentModel extends OsnovaModel {
  static tableName = 'tournament';
  static jsonSchema = TournamentSchema;

  static relationMappings = {
    matches: {
      relation: Model.BelongsToOneRelation,
      modelClass: __dirname + '/Match',
      join: {
        from: 'Tournament.id',
        to: 'Match.tournament_id'
      }
    }
  }

}