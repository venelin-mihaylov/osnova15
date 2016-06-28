"use strict"
import ActionType from "constants/ActionType"

export default function matchCompetitor(state = {
  loading: false,
  saving: false,
  listRecords: [],
  listError: null,
  globalError: null,
  fieldErrors: {}

}, action = {}) {
  switch (action.type) {
    case ActionType.MATCH_COMPETITOR_LIST_REQUESTED:
      return Object.assign({}, state, {
        loading: true
      })
    case ActionType.MATCH_COMPETITOR_LIST_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        listRecords: action.records
      })
    case ActionType.MATCH_COMPETITOR_LIST_ERROR:
      return Object.assign({}, state, {
        loading: false,
        listRecords: [],
        listError: action.globalError
      })
    case ActionType.MATCH_COMPETITOR_UPDATE_REQUESTED:
      return Object.assign({}, state, {
        saving: true
      })
    case ActionType.MATCH_COMPETITOR_UPDATE_SUCCESS:
      return Object.assign({}, state, {
        saving: false
      })
    case ActionType.MATCH_COMPETITOR_UPDATE_ERROR:
      return Object.assign({}, state, {
        saving: false,
        globalError: action.globalError,
        fieldErrors: action.fieldErrors
      })
    default:
      return state
  }
}
