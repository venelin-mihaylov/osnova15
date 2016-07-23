import {Model} from "objection"
import UserSchema from "../model/schema/UserSchema"

export default class UserModel extends Model {
  static tableName = 'users'
  static jsonSchema = UserSchema
}