const TargetZoneSchema = {
  type: 'object',
  required: ['name', 'score'],

  properties: {
    id: {type: 'integer'},
    name: {type: 'string', minLength: 2, maxLength: 255},
    score: {type: 'integer'},
    targetId: {type: 'integer'}
  }
}
export default TargetZoneSchema
