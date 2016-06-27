"use strict"
import ActionType from "constants/ActionType"

export default function nav(state = {
  leftNavOpen: true,
  activeMatchId: null
}, action = {}) {
  switch (action.type) {
    case ActionType.TOGGLE_LEFT_NAV:
      return Object.assign({}, state, {
        leftNavOpen: !state.leftNavOpen
      })
    case ActionType.ENTER_MATCH:
      return Object.assign({}, state, {
        activeMatchId: action.matchId
      })
    case ActionType.EXIT_MATCH:
      return Object.assign({}, state, {
        activeMatchId: null
      })
    default:
      return state
  }
}
