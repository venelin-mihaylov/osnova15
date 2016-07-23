const TargetRelations = {
  target_zone: {
    relation: 'HasMany',
    modelClass: 'TargetZone',
    join: {
      fromTable: 'target',
      fromField: 'id',
      toTable: 'target_zone',
      toField: 'targetId'
    }
  }
}
export default TargetRelations