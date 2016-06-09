"use strict";
import ActionType from "constants/ActionType";

export default function user(state = {
  error: '',
  loading: false,
  authenticated: false,
  fieldErrors: {}
}, action = {}) {
  switch (action.type) {
    case ActionType.LOGIN_USER_START:
      return Object.assign({}, state, {
        loading: true,
        error: ''
      });
    case ActionType.LOGIN_USER_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        authenticated: true,
        error: ''
      });
    case ActionType.LOGIN_USER_ERROR:
      return Object.assign({}, state, {
        loading: false,
        authenticated: false,
        error: action.error,
        fieldErrors: action.fieldErrors || {}
      });
    case ActionType.SIGNUP_USER_START:
      return Object.assign({}, state, {
        loading: true,
        error: ''
      });
    case ActionType.SIGNUP_USER_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        authenticated: true
      });
    case ActionType.SIGNUP_USER_ERROR:
      return Object.assign({}, state, {
        loading: false,
        authenticated: false,
        error: action.error
      });
    case ActionType.LOGOUT_USER_START:
      return Object.assign({}, state, {
        loading: true,
        error: ''
      });
    case ActionType.LOGOUT_USER_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        authenticated: false
      });
    case ActionType.LOGOUT_USER_ERROR:
      return Object.assign({}, state, {
        loading: false,
        authenticated: true
      });
    default:
      return state;
  }
}
