"use strict";
export default class CRUDActionType {

  static CREATE_REQUESTED = 'CREATE_REQUESTED';
  static CREATE_SUCCESS = 'CREATE_SUCCESS';
  static CREATE_ERROR = 'CREATE_ERROR';

  static READ_REQUESTED = 'READ_REQUESTED';
  static READ_SUCCESS = 'READ_SUCCESS';
  static READ_ERROR = 'READ_ERROR';

  static RESET = 'RESET';

  static UPDATE_REQUESTED = 'UPDATE_REQUESTED';
  static UPDATE_SUCCESS = 'UPDATE_SUCCESS';
  static UPDATE_ERROR = 'UPDATE_ERROR';

  static DELETE_REQUESTED = 'DELETE_REQUESTED';
  static DELETE_SUCCESS = 'DELETE_SUCCESS';
  static DELETE_ERROR = 'DELETE_ERROR';

  static LIST_REQUESTED = 'LIST_REQUESTED';
  static LIST_SUCCESS = 'LIST_SUCCESS';
  static LIST_ERROR = 'LIST_ERROR';

  static LIST_SET_LIMIT = 'LIST_SET_LIMIT';
  static LIST_SET_PAGE = 'LIST_SET_PAGE'; // triggers LIST_REQUESTED, which initiates server data retrieval

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
      type: CRUDActionType.prefixType(entity, actionType)
    }, rest)
  }
};
