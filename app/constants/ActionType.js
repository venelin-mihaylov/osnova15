import CRUDActionType from "constants/CRUDActionType";
import ForeignKeyActionType from "constants/FKActionType";

const ActionType = Object.assign({
    TOGGLE_LOGIN_MODE: 'TOGGLE_LOGIN_MODE',

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


    TOURNAMENT_FOREIGN_KEY_LOAD_REQUESTED: 'TOURNAMENT_FOREIGN_KEY_LOAD_REQUESTED',
    TOURNAMENT_FOREIGN_KEY_LOAD_START: 'TOURNAMENT_FOREIGN_KEY_LOAD_START',
    TOURNAMENT_FOREIGN_KEY_LOAD_SUCCESS: 'TOURNAMENT_FOREIGN_KEY_LOAD_SUCCESS',
    TOURNAMENT_FOREIGN_KEY_LOAD_ERROR: 'TOURNAMENT_FOREIGN_KEY_LOAD_ERROR'

  },
  CRUDActionType.create('tournament'),
  CRUDActionType.create('competitor'),
  CRUDActionType.create('match'),
  ForeignKeyActionType.create('tournament')
);
export default ActionType;