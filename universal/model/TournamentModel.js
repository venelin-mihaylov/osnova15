import {Model} from "objection";
import TournamentSchema from "../schema/TournamentSchema";

export default class TournamentModel extends Model {
  static tableName = 'tournament';
  static jsonSchema = TournamentSchema;

}