const TargetSchema = {
  type: 'object',
  required: ['name'],

  properties: {
    id: {type: 'integer'},
    name: {type: 'string', minLength: 10, maxLength: 255},
    favourite: {type: 'boolean'}
  }
}
export default TargetSchema
