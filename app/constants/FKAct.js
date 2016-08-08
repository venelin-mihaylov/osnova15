"use strict"

export default class FKAct {

  static FK_LIST_REQUESTED = 'FK_LIST_REQUESTED'
  static FK_LIST_SUCCESS = 'FK_LIST_SUCCESS'
  static FK_LIST_ERROR = 'FK_LIST_ERROR'

  static FK_READ_REQUESTED = 'FK_READ_REQUESTED'
  static FK_READ_SUCCESS = 'FK_READ_SUCCESS'
  static FK_READ_ERROR = 'FK_READ_ERROR'

  static FK_CLEAR_SELECTION = 'FK_CLEAR_SELECTION'
  static FK_PRELOAD_RECORD = 'FK_PRELOAD_RECORD'
  static FK_RESET = 'FK_RESET'

  static FK_LAST_SEARCH_TEXT = 'FK_LAST_SEARCH_TEXT'

  static create(object) {
    let ret = {}
    for (let action in this) {
      if (typeof action === "string") {
        let g = `${object.toUpperCase()}_${action}`
        ret[g] = g
      }
    }
    return ret
  }

  /**
   *
   * @param {string} entity
   * @param {string} variation
   * @param {string} action
   * @returns {*}
   */
  static prefixType(entity, variation, action) {
    return entity.toUpperCase() + '_' + variation.toUpperCase() + '_' + action
  }

  static act = (entity, variation) => (actionType, rest = {}) => {
    if(typeof rest == 'object') {
      return Object.assign({
        type: FKAct.prefixType(entity, variation, actionType)
      }, rest)
    } else {
      return {
        type: FKAct.prefixType(entity, variation, actionType),
        value: rest
      }
    }
  }
}
