"use strict"
export default class ItoNActionType {

  static I_TO_N_LIST_REQUESTED = 'I_TO_N_LIST_REQUESTED'
  static I_TO_N_LIST_SUCCESS = 'I_TO_N_LIST_SUCCESS'
  static I_TO_N_LIST_ERROR = 'I_TO_N_LIST_ERROR'

  static I_TO_N_UPDATE_REQUESTED = 'I_TO_N_UPDATE_REQUESTED'
  static I_TO_N_UPDATE_SUCCESS = 'I_TO_N_UPDATE_SUCCESS'
  static I_TO_N_UPDATE_ERROR = 'I_TO_N_UPDATE_ERROR'

  /**
   *
   * @param {string} entity
   * @param {string} relation
   * @returns {{}}
     */
  static create(entity, relation) {
    let ret = {}
    for (let action in this) {
      if (typeof action === "string" && this.prototype.hasOwnProperty(action)) {
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
      type: ItoNActionType.prefixType(entity, relation, actionType)
    }, rest)
  }
}
