import {Model} from 'objection'
import UserSchema from './schema/UserSchema'

export default class User extends Model {
  static tableName = 'users'
  static jsonSchema = UserSchema
}