const UserSchema = {
  type: 'object',
  required: ['email', 'password'],

  properties: {
    id: {type: 'integer'},
    email: {type: 'string', minLength: 1, maxLength: 255},
    password: {type: 'string', minLength: 1, maxLength: 255},
  }
}
export default UserSchema
