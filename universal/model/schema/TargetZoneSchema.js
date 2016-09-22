const TargetZoneSchema = {
  type: 'object',
  required: ['name', 'width', 'height'],

  properties: {
    id: {type: 'integer'},
    name: {type: 'string', minLength: 2, maxLength: 8},
    width: {type: 'number'},
    height: {type: 'number'},
    targetId: {type: 'integer'}
  }
}
export default TargetZoneSchema
