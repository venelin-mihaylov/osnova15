"use strict"
import FKAct from "../constants/FKAct"
export default function FKReducer(entity, variation) {
  return function (state = {
    loading: false,
    globalError: null,
    records: [],
    recordById: [],
    lastSearchText: null
  }, action = {}) {
    const type = type => FKAct.prefixType(entity, variation, type)
    let ret = null

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
        })
      case type(FKAct.FK_READ_SUCCESS):
        ret = Object.assign({}, state, {
          loading: false
        })
        ret.recordById[action.id] = action.record
        return ret
      case type(FKAct.FK_READ_ERROR):
        return Object.assign({}, state, {
          loading: false,
          globalError: action.globalError
        })
      case type(FKAct.FK_RESET):
        return Object.assign({}, state, {
          loading: false,
          records: [],
          recordById: [],
          globalError: false
        })
      case type(FKAct.FK_CLEAR_SELECTION):
        ret = Object.assign({}, state)
        delete ret.recordById[action.value]
        return ret
      case type(FKAct.FK_PRELOAD_RECORD):
        ret = Object.assign({}, state)
        ret.recordById[action.id] = action.record
        return ret
      case type(FKAct.FK_LAST_SEARCH_TEXT):
        return Object.assign({}, state, {
          lastSearchText: action.value,
        })
      default:
        return state
    }
  }
}
