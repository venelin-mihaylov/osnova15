"use strict";
import CRUDActionType from "utils/CRUDActionType";

export default function createCRUDReducer(object) {
  return function (state = {
    params: null, // params passed by the action, i.e. "{view:basic}", or "{view:extended}"
    message: null, // message to the user, i.e. record loaded/saved successfully, (not an error)
    globalError: null, // general (field unspecific) error, say "bad input", "db error", etc.
    fieldErrors: null, // per field error message, i.e {name: "too short", age: "required field"}
    loading: false, // are we loading from the server?
    saving: false, // are we saving to the server?
    record: null, //  currently edited record
    deleteId: null // id to delete / deleted id

    listError: false, // list error
    listLoading: false, // are loading the list from the server
    listRecords: [], // list record
    listFilters: null, // list filters
    listLimit: 100, // list limit
  }, action = {}) {
    let addPrefix = type => `${object.toUpperCase()}_${type}`;

    switch (action.type) {
      case addPrefix(CRUDActionType.LIST_START):
        return Object.assign({}, state, {
          params: action.params,
          listLoading: true,
          listRecords: [],
          listError: null
        });
      case addPrefix(CRUDActionType.LIST_SUCCESS):
        return Object.assign({}, state, {
          listLoading: false,
          listRecords: action.records,
          listError: null
        });
      case addPrefix(CRUDActionType.LIST_ERROR):
        return Object.assign({}, state, {
          loading: false,
          listError: action.error
          listRecords: []
        });
      case addPrefix(CRUDActionType.READ_START):
        return Object.assign({}, state, {
          params: action.params,
          loading: true,
          record: null,
          message: null,
          globalError: null
        });
      case addPrefix(CRUDActionType.READ_SUCCESS):
        return Object.assign({}, state, {
          params: action.params,
          loading: false,
          record: action.record,
          message: action.message
        });
      case addPrefix(CRUDActionType.READ_ERROR):
        return Object.assign({}, state, {
          params: action.params,
          loading: false,
          globalError: action.globalError,
          record: null
        });
      case addPrefix(CRUDActionType.UPDATE_START):
        return Object.assign({}, state, {
          params: action.params,
          saving: true
        });
      case addPrefix(CRUDActionType.UPDATE_SUCCESS):
        return Object.assign({}, state, {
          params: action.params,
          saving: false,
          record: action.record
        });
      case addPrefix(CRUDActionType.UPDATE_ERROR):
        return Object.assign({}, state, {
          params: action.params,
          saving: false,
          record: action.record,
          globalError: action.globalError,
          fieldErrors: action.fieldErrors
        });
      case addPrefix(CRUDActionType.DELETE_START):
        return Object.assign({}, state, {
          params: action.params,
          saving: true,
          deleteId: action.id
        });
      case addPrefix(CRUDActionType.DELETE_SUCCESS):
        return Object.assign({}, state, {
          params: action.params,
          saving: false,
          message: action.message,
          deleteId: action.id
        });
      case addPrefix(CRUDActionType.DELETE_ERROR):
        return Object.assign({}, state, {
          params: action.params,
          saving: false,
          globalError: action.globalError,
          deleteId: action.id
        });
      case addPrefix(CRUDActionType.LIST_SET_LIMIT):
        return Object.assign({}, state, {
          limit: action.limit
        });
      default:
        return state;
    }
  }
}
