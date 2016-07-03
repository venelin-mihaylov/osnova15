"use strict"
import ActionType from "constants/ActionType"

export default function misc(state = {
  matchAddCreatedCompetitor: false
}, action = {}) {
  switch (action.type) {
    case ActionType.MATCH_DO_ADD_CREATED_COMPETITOR:
      return Object.assign({}, state, {
        matchAddCreatedCompetitor: true
      })
    case ActionType.MATCH_DONT_ADD_CREATED_COMPETITOR:
      return Object.assign({}, state, {
        matchAddCreatedCompetitor: false
      })
    default:
      return state
  }
}
