const TargetZoneSchema = {
  type: 'object',
  required: ['name', 'score'],

  properties: {
    id: {type: 'integer'},
    name: {type: 'string', minLength: 9, maxLength: 255},
    score: {type: ['string', 'integer']},
    targetId: {type: ['string']}
  }
}
export default TargetZoneSchema
