const TargetZoneSchema = {
  type: 'object',
  required: ['name', 'score'],

  properties: {
    id: {type: 'integer'},
    name: {type: 'string', maxLength: 255},
    score: {type: ['string', 'integer']},
    targetId: {type: ['string']}
  }
}
export default TargetZoneSchema
