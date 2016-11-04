const TargetZoneRelations = {
  target: {
    relation: 'BelongsToOne',
    modelClass: 'Target',
    join: {
      fromTable: 'target_zone',
      fromField: 'targetId',
      toTable: 'target',
      toField: 'id'
    }
  }
}
export default TargetZoneRelations
