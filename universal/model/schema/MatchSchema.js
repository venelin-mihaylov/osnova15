const MatchSchema = {
  type: 'object',
  required: ['name', 'tournamentId'],
  properties: {
    id: {type: 'integer'},
    name: {type: 'string'},
    description: {type: 'string'},
    tournamentId: {type: 'integer', labelField: "name"},
    discipline: {
      type: 'integer',
      enum: [1, 2, 3],
      enumProps: {
        1: 'T-class tactical sniper',
        2: 'T-class ultra long range',
        3: 'T-class rimfire',
        4: 'T-class multigun'
      }
    },
    type: {
      type: 'integer',
      enum: [1,2],
      enumProps: {
        1: 'Individual',
        2: 'Team/Individual'
      }
    },
    startDate: {type: 'string', format: 'date-time', subtype: 'date'},
    endDate: {type: 'string', format: 'date-time', subtype: 'date'},
    organizer: {type: 'string'},
    country: {type: 'string'},
    rangeMaster: {type: 'string'},
    statMaster: {type: 'string'},
    matchDirector: {type: 'string'},
  }
}
export default MatchSchema
