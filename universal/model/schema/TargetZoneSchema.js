const TargetZoneSchema = {
  type: 'object',
  required: ['name', 'width', 'height'],

  properties: {
    id: {type: 'integer'},
    name: {type: 'string', minLength: 2, maxLength: 8},
    description: {type: 'string'},
    width: {type: 'integer'},
    height: {type: 'integer'},
    targetId: {type: 'integer'}
  }
}
export default TargetZoneSchema
