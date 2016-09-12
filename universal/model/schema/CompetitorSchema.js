const CompetitorSchema = {
  type: 'object',
  required: ['firstName', 'lastName', 'email'],
  properties: {
    id: {type: 'integer'},
    globalId: {type: 'string', maxLength: 255},
    firstName: {type: 'string', maxLength: 255},
    lastName: {type: 'string', maxLength: 255},
    nickName: {type: 'string', maxLength: 255},
    birthDate: {type: 'string', maxLength: 255, format: 'date', subtype: 'date'},
    email: {type: 'string', maxLength: 255, format: 'email'},
    phone: {type: 'string', maxLength: 255},
    country: {type: 'string', maxLength: 255},
    club: {type: 'string', maxLength: 255}
  }
}
export default CompetitorSchema
