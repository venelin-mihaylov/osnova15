"use strict"
import FKActionType from "../constants/FKActionType"
export default function FKReducer(entity, variation) {
  return function (state = {
    loading: false,
    globalError: null,
    records: [],
    valueRecord: null
  }, action = {}) {
    const type = type => FKActionType.prefixType(entity, variation, type)

    switch (action.type) {
      case type(FKActionType.FK_LIST_REQUESTED):
        return Object.assign({}, state, {
          loading: true
        })
      case type(FKActionType.FK_LIST_SUCCESS):
        return Object.assign({}, state, {
          loading: false,
          records: action.records
        })
      case type(FKActionType.FK_LIST_ERROR):
        return Object.assign({}, state, {
          loading: false,
          records: [],
          globalError: action.globalError
        })
      case type(FKActionType.FK_READ_REQUESTED):
        return Object.assign({}, state, {
          loading: true,
          valueRecord: null
        })
      case type(FKActionType.FK_READ_SUCCESS):
        return Object.assign({}, state, {
          loading: false,
          valueRecord: action.valueRecord
        })
      case type(FKActionType.FK_READ_ERROR):
        return Object.assign({}, state, {
          loading: false,
          valueRecord: null,
          globalError: action.globalError
        })
      case type(FKActionType.FK_RESET):
        return Object.assign({}, state, {
          loading: false,
          valueRecord: null,
          records: [],
          globalError: false
        })
      case type(FKActionType.FK_CLEAR_SELECTION):
        return Object.assign({}, state, {
          valueRecord: null,
          records: []
        })
      default:
        return state
    }
  }
}
