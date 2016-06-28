"use strict"
export default class OneToManhyActionType {

  static ONE_TO_MANY_LIST_REQUESTED = 'ONE_TO_MANY_LIST_REQUESTED'
  static ONE_TO_MANY_LIST_SUCCESS = 'ONE_TO_MANY_LIST_SUCCESS'
  static ONE_TO_MANY_LIST_ERROR = 'ONE_TO_MANY_LIST_ERROR'

  static ONE_TO_MANY_UPDATE_REQUESTED = 'ONE_TO_MANY_UPDATE_REQUESTED'
  static ONE_TO_MANY_UPDATE_SUCCESS = 'ONE_TO_MANY_UPDATE_SUCCESS'
  static ONE_TO_MANY_UPDATE_ERROR = 'ONE_TO_MANY_UPDATE_ERROR'


  /**
   *
   * @param {string} entity
   * @param {string} relation
   * @returns {{}}
     */
  static create(entity, relation) {
    let ret = {}
    for (let action in this) {
      if (typeof action === "string") {
        let g = `${entity.toUpperCase()}_${relation.toUpperCase()}_${action}`
        ret[g] = g
      }
    }
    return ret
  }

  /**
   *
   * @param {string} entity
   * @param {string} relation
   * @param {string} action
   * @returns {*}
   */
  static prefixType(entity, relation, action) {
    return entity.toUpperCase() + '_' + relation.toUpperCase() + '_' + action
  }

  static act = (entity, relation) => (actionType, rest = {}) => {
    return Object.assign({
      type: OneToManhyActionType.prefixType(entity, relation, actionType)
    }, rest)
  }
}
