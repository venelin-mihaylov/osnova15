"use strict"
import FKActionType from "../constants/FKActionType"
export default function FKReducer(entity, variation) {
  return function (state = {
    loading: false,
    globalError: null,
    records: [],
    renderedRecords: [],
    valueRecord: null,
    valueLabel: null
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
          records: action.records,
          renderedRecords: action.renderedRecords
        })
      case type(FKActionType.FK_LIST_ERROR):
        return Object.assign({}, state, {
          loading: false,
          records: [],
          renderedRecords: [],
          globalError: action.globalError
        })
      case type(FKActionType.FK_READ_REQUESTED):
        return Object.assign({}, state, {
          loading: true,
          valueRecord: null,
          valueLabel: null
        })
      case type(FKActionType.FK_READ_SUCCESS):
        return Object.assign({}, state, {
          loading: false,
          valueRecord: action.valueRecord,
          valueLabel: action.valueLabel
        })
      case type(FKActionType.FK_READ_ERROR):
        return Object.assign({}, state, {
          loading: false,
          valueRecord: null,
          valueLabel: null,
          globalError: action.globalError
        })
      case type(FKActionType.FK_RESET):
        return Object.assign({}, state, {
          loading: false,
          valueRecord: null,
          valueLabel: null,
          records: [],
          renderedRecords: []
        })
      case type(FKActionType.FK_CLEAR_SELECTION):
        return Object.assign({}, state, {
          valueRecord: null,
          valueLabel: null,
          records: [],
          renderedRecords: []
        })
      default:
        return state
    }
  }
}
