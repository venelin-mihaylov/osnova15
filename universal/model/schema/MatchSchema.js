const MatchSchema = {
  type: 'object',
  required: ['name', 'discipline', 'type', 'startDate', 'endDate', 'country'],
  properties: {
    id: {type: 'integer'},
    tournamentId: {type: ['null', 'integer'], labelField: 'name'},
    name: {type: 'string'},
    startDate: {type: 'string', format: 'date'},
    endDate: {type: 'string', format: 'date'},
    discipline: {
      type: 'integer',
      enum: [1, 2, 3, 4],
      enumProps: {
        1: 'T-class tactical sniper',
        2: 'T-class ultra long range',
        3: 'T-class rimfire',
        4: 'T-class multigun'
      }
    },
    type: {
      type: 'integer',
      enum: [1, 2],
      enumProps: {
        1: 'Individual',
        2: 'Team/Individual'
      }
    },
    organizer: {type: 'string'},
    country: {type: 'string'},
    rangeMaster: {type: 'string'},
    statMaster: {type: 'string'},
    matchDirector: {type: 'string'},
    description: {type: 'string', uiControl: 'TextArea'},
  }
}
export default MatchSchema
