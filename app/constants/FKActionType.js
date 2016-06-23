"use strict";
export default class FKActionType {

  static FK_LIST_REQUESTED = 'FK_LIST_REQUESTED';
  static FK_LIST_SUCCESS = 'FK_LIST_SUCCESS';
  static FK_LIST_ERROR = 'FK_LIST_ERROR';

  static FK_READ_REQUESTED = 'FK_READ_REQUESTED';
  static FK_READ_SUCCESS = 'FK_READ_SUCCESS';
  static FK_READ_ERROR = 'FK_READ_ERROR';

  static FK_RESET = 'FK_RESET';

  static create(object) {
    var ret = {};
    for (var action in this) {
      if (typeof action === "string") {
        var g = `${object.toUpperCase()}_${action}`;
        ret[g] = g;
      }
    }
    return ret;
  }

  /**
   *
   * @param {string} entity
   * @param {string} action
   * @returns {*}
   */
  static prefixType(entity, action) {
    return entity.toUpperCase() + '_' + action;
  }

  static act = entity => (actionType, rest = {}) => {
    return Object.assign({
      type: FKActionType.prefixType(entity, actionType)
    }, rest)
  }
};
