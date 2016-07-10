"use strict"
import FKAct from "../constants/FKAct"
export default function FKReducer(entity, variation) {
  return function (state = {
    loading: false,
    globalError: null,
    records: [],
    valueRecord: null,
    lastSearchText: null
  }, action = {}) {
    const type = type => FKAct.prefixType(entity, variation, type)

    switch (action.type) {
      case type(FKAct.FK_LIST_REQUESTED):
        return Object.assign({}, state, {
          loading: true
        })
      case type(FKAct.FK_LIST_SUCCESS):
        return Object.assign({}, state, {
          loading: false,
          records: action.records
        })
      case type(FKAct.FK_LIST_ERROR):
        return Object.assign({}, state, {
          loading: false,
          records: [],
          globalError: action.globalError
        })
      case type(FKAct.FK_READ_REQUESTED):
        return Object.assign({}, state, {
          loading: true,
          valueRecord: null
        })
      case type(FKAct.FK_READ_SUCCESS):
        return Object.assign({}, state, {
          loading: false,
          valueRecord: action.valueRecord
        })
      case type(FKAct.FK_READ_ERROR):
        return Object.assign({}, state, {
          loading: false,
          valueRecord: null,
          globalError: action.globalError
        })
      case type(FKAct.FK_RESET):
        return Object.assign({}, state, {
          loading: false,
          valueRecord: null,
          records: [],
          globalError: false
        })
      case type(FKAct.FK_CLEAR_SELECTION):
        return Object.assign({}, state, {
          valueRecord: null,
          records: []
        })
      case type(FKAct.FK_PRELOAD_RECORD):
        return Object.assign({}, state, {
          valueRecord: action.value,
        })
      case type(FKAct.FK_LAST_SEARCH_TEXT):
        return Object.assign({}, state, {
          lastSearchText: action.value,
        })
      default:
        return state
    }
  }
}
