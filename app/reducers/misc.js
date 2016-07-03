"use strict"
import ActionType from "constants/ActionType"

export default function misc(state = {
  matchAddCreatedCompetitor: false
}, action = {}) {
  switch (action.type) {
    case ActionType.MATCH_ADD_CREATED_COMPETITOR:
      return Object.assign({}, state, {
        matchAddCreatedCompetitor: action.value
      })
    default:
      return state
  }
}
