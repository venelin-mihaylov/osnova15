"use strict";
export default class FKActionType {

  static FOREIGN_KEY_LIST_START = 'FOREIGN_KEY_LIST_START';
  static FOREIGN_KEY_LIST_SUCCESS = 'FOREIGN_KEY_LIST_SUCCESS';
  static FOREIGN_KEY_LIST_ERROR = 'FOREIGN_KEY_LIST_ERROR';

  static FOREIGN_KEY_READ_START = 'FOREIGN_KEY_READ_START';
  static FOREIGN_KEY_READ_SUCCESS = 'FOREIGN_KEY_READ_SUCCESS';
  static FOREIGN_KEY_READ_ERROR = 'FOREIGN_KEY_READ_ERROR';

  static FOREIGN_KEY_RESET = 'FOREIGN_KEY_RESET';

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
};
