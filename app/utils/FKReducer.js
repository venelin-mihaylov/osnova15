"use strict";
import FKActionType from "utils/FKActionType";
export default function createFKReducer(object) {
  return function (state = {
    loading: false,
    err: null,
    records: [],
    renderedRecords: [],
    valueRecord: null,
    valueLabel: null
  }, action = {}) {
    object = object.toUpperCase();
    let addPrefix = type => `${object}_${type}`;

    switch (action.type) {
      case addPrefix(FKActionType.FOREIGN_KEY_LIST_START):
        return Object.assign({}, state, {
          loading: true
        });
      case addPrefix(FKActionType.FOREIGN_KEY_LIST_SUCCESS):
        return Object.assign({}, state, {
          loading: false,
          records: action.records,
          renderedRecords: action.renderedRecords
        });
      case addPrefix(FKActionType.FOREIGN_KEY_LIST_ERROR):
        return Object.assign({}, state, {
          loading: false,
          records: [],
          renderedRecords: [],
          globalError: action.err
        });
      case addPrefix(FKActionType.FOREIGN_KEY_READ_START):
        return Object.assign({}, state, {
          loading: true,
          valueRecord: null,
          valueLabel: null
        });
      case addPrefix(FKActionType.FOREIGN_KEY_READ_SUCCESS):
        return Object.assign({}, state, {
          loading: false,
          valueRecord: action.valueRecord,
          valueLabel: action.valueLabel
        });
      case addPrefix(FKActionType.FOREIGN_KEY_READ_ERROR):
        return Object.assign({}, state, {
          loading: false,
          valueRecord: null,
          valueLabel: null,
          globalError: action.err
        });
      case addPrefix(FKActionType.FOREIGN_KEY_RESET):
        return Object.assign({}, state, {
          loading: false,
          valueRecord: null,
          valueLabel: null,
          records: [],
          renderedRecords: []
        });
      default:
        return state;
    }
  }
};
