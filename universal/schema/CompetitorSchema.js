const CompetitorSchema = {
  type: 'object',
  required: ['firstName', 'lastName', 'email'],
  properties: {
    id: {type: 'integer'},
    firstName: {type: 'string', maxLength: 255},
    lastName: {type: 'string', maxLength: 255},
    email: {type: 'string', maxLength: 255},
  }
}
export default CompetitorSchema
