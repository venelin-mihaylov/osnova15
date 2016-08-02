const ExerciseSchema = {
  type: 'object',
  required: ['name'],
  properties: {
    id: {type: 'integer'},
    name: {type: 'string', maxLength: 255},
    minShots: {type: 'integer', min: 1, max: 99999},
    type: {
      type: 'integer',
      enum: [1,2],
      enumProps: {
        1: 'Individual',
        2: 'Team'
      }
    },
    module: {
      type: 'integer',
      enum: [1, 2, 3],
      enumProps: {
        1: 'Module 1',
        2: 'Module 2',
        3: 'Module 3'
      }
    },
    rangeOfficer: {type: 'string'},
    signature: {type: 'string'},
    favourite: {type: 'boolean'}
  }
}
export default ExerciseSchema