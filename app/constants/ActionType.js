import CRUDActionType from "constants/CRUDActionType"
import ForeignKeyActionType from "constants/FKActionType"
import ItoNActionType from 'constants/ItoNActionType'

const ActionType = Object.assign({
    TOGGLE_LEFT_NAV: 'TOGGLE_LEFT_NAV',
    TOGGLE_LOGIN_MODE: 'TOGGLE_LOGIN_MODE',

    ENTER_MATCH: 'ENTER_MATCH',
    EXIT_MATCH: 'EXIT_MATCH',

    LOGIN_USER_REQUESTED: 'LOGIN_USER_REQUESTED',
    LOGIN_USER_START: 'LOGIN_USER_START',
    LOGIN_USER_SUCCESS: 'LOGIN_USER_SUCCESS',
    LOGIN_USER_ERROR: 'LOGIN_USER_ERROR',

    SIGNUP_USER_START: 'SIGNUP_USER_START',
    SIGNUP_USER_SUCCESS: 'SIGNUP_USER_SUCCESS',
    SIGNUP_USER_ERROR: 'SIGNUP_USER_ERROR',

    LOGOUT_USER_REQUESTED: 'LOGOUT_USER_REQUESTED',
    LOGOUT_USER_START: 'LOGOUT_USER_START',
    LOGOUT_USER_SUCCESS: 'LOGOUT_USER_SUCCESS',
    LOGOUT_USER_ERROR: 'LOGOUT_USER_ERROR',

    MATCH_ADD_CREATED_COMPETITOR: 'MATCH_DO_ADD_CREATED_COMPETITOR',

  },
  ItoNActionType.create('match', 'tournament'),
  CRUDActionType.create('tournament'),
  CRUDActionType.create('competitor'),
  CRUDActionType.create('match'),
  ForeignKeyActionType.create('tournament')
)
export default ActionType
