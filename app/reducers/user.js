import Act from 'constants/Act'

export default function user(state = {
  error: '',
  loading: false,
  authenticated: false,
  fieldErrors: {},
  user: {}
}, action = {}) {
  switch (action.type) {
    case Act.LOGIN_USER_START:
      return Object.assign({}, state, {
        loading: true,
        error: ''
      })
    case Act.LOGIN_USER_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        authenticated: true,
        error: '',
        user: action.user
      })
    case Act.LOGIN_USER_ERROR:
      return Object.assign({}, state, {
        loading: false,
        authenticated: false,
        error: action.error,
        fieldErrors: action.fieldErrors || {}
      })
    case Act.SIGNUP_USER_START:
      return Object.assign({}, state, {
        loading: true,
        error: ''
      })
    case Act.SIGNUP_USER_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        authenticated: true
      })
    case Act.SIGNUP_USER_ERROR:
      return Object.assign({}, state, {
        loading: false,
        authenticated: false,
        error: action.error
      })
    case Act.LOGOUT_USER_START:
      return Object.assign({}, state, {
        loading: true,
        error: ''
      })
    case Act.LOGOUT_USER_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        authenticated: false,
        user: {}
      })
    case Act.LOGOUT_USER_ERROR:
      return Object.assign({}, state, {
        loading: false,
        authenticated: true
      })
    default:
      return state
  }
}
