"use strict"
import CRUDActionType from "../constants/CRUDActionType"

export default function CRUDReducer(entity) {
  let addPrefix = type => `${entity.toUpperCase()}_${type}`

  return function CRUD(state = {
    params: null, // params passed by the action, i.e. "{view:basic}", or "{view:extended}"
    message: null, // message to the user, i.e. record loaded/saved successfully, (not an error)
    globalError: null, // general (field unspecific) error, say "bad input", "db error", etc.
    fieldErrors: null, // per field error message, i.e {name: "too short", age: "required field"}
    loading: false, // are we loading from the server?
    saving: false, // are we saving to the server?
    record: null, //  currently edited record
    deleteId: null, // id to delete / deleted id
    nextUri: `/${entity}`, // set next uri

    listError: false, // list error
    listLoading: false, // are loading the list from the server
    listRecords: [], // list record
    listFilter: null, // list filters
    listPage: 1, // list page
    listLimit: 100 // list limit
  }, action = {}) {

    switch (action.type) {
      case addPrefix(CRUDActionType.CREATE_REQUESTED):
        return Object.assign({}, state, {
          saving: true
        })
      case addPrefix(CRUDActionType.CREATE_SUCCESS):
        return Object.assign({}, state, {
          saving: false
      })
      case addPrefix(CRUDActionType.CREATE_ERROR):
        return Object.assign({}, state, {
          saving: false,
          globalError: action.globalError,
          fieldErrors: action.fieldErrors
        })
      case addPrefix(CRUDActionType.LIST_REQUESTED):
        return Object.assign({}, state, {
          params: action.params,
          listLoading: true,
          listRecords: [],
          listError: null,
          listPage: action.page,
          listFilter: action.filter
        })
      case addPrefix(CRUDActionType.LIST_SUCCESS):
        return Object.assign({}, state, {
          listLoading: false,
          listRecords: action.records,
          listError: null
        })
      case addPrefix(CRUDActionType.LIST_ERROR):
        return Object.assign({}, state, {
          listLoading: false,
          listError: action.globalError,
          listRecords: []
        })
      case addPrefix(CRUDActionType.READ_REQUESTED):
        return Object.assign({}, state, {
          params: action.params,
          loading: true,
          record: null,
          message: null,
          globalError: null
        })
      case addPrefix(CRUDActionType.READ_SUCCESS):
        return Object.assign({}, state, {
          params: action.params,
          loading: false,
          record: action.record,
          message: action.message
        })
      case addPrefix(CRUDActionType.READ_ERROR):
        return Object.assign({}, state, {
          params: action.params,
          loading: false,
          globalError: action.globalError || "Error occurred",
          record: null
        })
      case addPrefix(CRUDActionType.UPDATE_REQUESTED):
        return Object.assign({}, state, {
          params: action.params,
          saving: true,
          globalError: null,
          fieldErrors: null
        })
      case addPrefix(CRUDActionType.UPDATE_SUCCESS):
        return Object.assign({}, state, {
          params: action.params,
          saving: false,
          record: action.record
        })
      case addPrefix(CRUDActionType.UPDATE_ERROR):
        return Object.assign({}, state, {
          params: action.params,
          saving: false,
          record: action.record,
          globalError: action.globalError || "Error occurred",
          fieldErrors: action.fieldErrors
        })
      case addPrefix(CRUDActionType.DELETE_REQUESTED):
        return Object.assign({}, state, {
          params: action.params,
          saving: true,
          deleteId: action.id
        })
      case addPrefix(CRUDActionType.DELETE_SUCCESS):
        return Object.assign({}, state, {
          params: action.params,
          saving: false,
          message: action.message,
          deleteId: action.id
        })
      case addPrefix(CRUDActionType.DELETE_ERROR):
        return Object.assign({}, state, {
          params: action.params,
          saving: false,
          globalError: action.globalError || "Error occurred",
          deleteId: action.id
        })
      case addPrefix(CRUDActionType.LIST_SET_LIMIT):
        return Object.assign({}, state, {
          listLimit: action.limit
        })
      case addPrefix(CRUDActionType.LIST_SET_PAGE):
        return Object.assign({}, state, {
          listPage: action.page
        })
      case addPrefix(CRUDActionType.SET_NEXT_URI):
        return Object.assign({}, state, {
          nextUri: action.nextUri
        })
      case addPrefix(CRUDActionType.CLEAN_NEXT_URI):
        return Object.assign({}, state, {
          nextUri: `/${entity}`
        })
      default:
        return state
    }
  }
}
