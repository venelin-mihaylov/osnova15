import Act from 'constants/Act'

export default function nav(state = {
  leftNavOpen: true,
  activeMatchId: null
}, action = {}) {
  switch (action.type) {
    case Act.TOGGLE_LEFT_NAV:
      return Object.assign({}, state, {
        leftNavOpen: !state.leftNavOpen
      })
    case Act.ENTER_MATCH:
      return Object.assign({}, state, {
        activeMatchId: action.matchId
      })
    case Act.EXIT_MATCH:
      return Object.assign({}, state, {
        activeMatchId: null
      })
    default:
      return state
  }
}
