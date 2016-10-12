const ExerciseSchema = {
  type: 'object',
  required: ['name', 'type', 'module', 'minShots', 'rangeOfficer'],
  // required: ['name'],
  properties: {
    id: {type: 'integer'},
    matchId: {type: ['null', 'integer'], labelField: 'name', noForm: true},
    name: {type: 'string', maxLength: 255},
    minShots: {type: 'integer', min: 1, max: 99999},
    type: {
      type: ['null', 'integer'],
      enum: [1, 2],
      enumProps: {
        1: 'Individual',
        2: 'Team'
      }
    },
    module: {
      type: ['null', 'integer'],
      enum: [1, 2, 3],
      enumProps: {
        1: 'Module 1',
        2: 'Module 2',
        3: 'Module 3'
      }
    },
    rangeOfficer: {type: 'string'},
    signature: {type: 'string'},
    briefing: {type: 'string', uiControl: 'TextArea'},
    favourite: {type: 'boolean', noForm: true}
  }
}
export default ExerciseSchema
