import {Model} from 'objection'
import _ from 'lodash'

/**
 * If node environemtn, return objection relation type
 * If web environment, return string
 *
 * @param {string} relType
 */
export function toObjectionRelations(relations) {
  const toObject = (relType) => {
    switch (relType) {
      case 'HasMany':
        return Model.HasManyRelation
      case 'BelongsToOne':
        return Model.BelongsToOneRelation
      default:
        const msg = "bad relation type:" + relType
        throw new Error(msg)
    }
  }

  return _.mapValues(relations, (rel, relName) => {
    if(_.isFunction(rel.relation)) {
      return rel
    }
    const ret = Object.assign(rel, {
      relation: toObject(rel.relation),
      modelClass: `${__dirname}/../${rel.modelClass}`,
      join: {
        from: `${rel.join.fromTable}.${rel.join.fromField}`,
        to: `${rel.join.toTable}.${rel.join.toField}`
      }
    })
    console.log(relName)
    console.log(ret)
    return ret
  })
}
