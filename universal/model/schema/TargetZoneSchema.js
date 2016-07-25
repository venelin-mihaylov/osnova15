const TargetZoneSchema = {
  type: 'object',
  required: ['name', 'score', 'width', 'height', 'weight'],

  properties: {
    id: {type: 'integer'},
    name: {type: 'string', minLength: 2, maxLength: 255},
    width: {type: 'number'},
    height: {type: 'number'},
    weight: {type: 'number'},
    score: {type: 'integer'},
    targetId: {type: 'integer'}
  }
}
export default TargetZoneSchema