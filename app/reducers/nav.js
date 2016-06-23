"use strict"
import ActionType from "constants/ActionType"

export default function nav(state = {
  leftNavOpen: true
}, action = {}) {
  switch (action.type) {
    case ActionType.TOGGLE_LEFT_NAV:
      return Object.assign({}, state, {
        leftNavOpen: !state.leftNavOpen
      })
    default:
      return state
  }
}
