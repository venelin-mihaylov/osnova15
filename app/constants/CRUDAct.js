"use strict"

import {toActionObject} from 'utils/Util'

export default class CRUDAct {

  static CREATE_REQUESTED = 'CREATE_REQUESTED'
  static CREATE_SUCCESS = 'CREATE_SUCCESS'
  static CREATE_ERROR = 'CREATE_ERROR'

  static READ_REQUESTED = 'READ_REQUESTED'
  static READ_SUCCESS = 'READ_SUCCESS'
  static READ_ERROR = 'READ_ERROR'

  static UPDATE_REQUESTED = 'UPDATE_REQUESTED'
  static UPDATE_SUCCESS = 'UPDATE_SUCCESS'
  static UPDATE_ERROR = 'UPDATE_ERROR'

  static DELETE_REQUESTED = 'DELETE_REQUESTED'
  static DELETE_SUCCESS = 'DELETE_SUCCESS'
  static DELETE_ERROR = 'DELETE_ERROR'

  static LIST_REQUESTED = 'LIST_REQUESTED'
  static LIST_SUCCESS = 'LIST_SUCCESS'
  static LIST_ERROR = 'LIST_ERROR'

  static LIST_SET_LIMIT = 'LIST_SET_LIMIT'
  static LIST_SET_PAGE = 'LIST_SET_PAGE' // triggers LIST_REQUESTED, which initiates server data retrieval
  static LIST_SET_SELECTION = 'LIST_SET_SELECTION'
  static LIST_CLEAR_SELECTION = 'LIST_CLEAR_SELECTION'

  static LIST_SORT_REQUESTED = 'LIST_SORT_REQUESTED'

  static RESET_FORM = 'RESET_FORM'
  static RESET = 'RESET'

  static SELECT_CREATED_FK_RECORD = 'SELECT_CREATED_FK_RECORD'

  static create(object) {
    let ret = {}
    for (let action in this) {
      if (typeof action === "string") {
        let g = `${object.toUpperCase()}_${action}`
        ret[g] = g
      }
    }
    return ret
  }

  /**
   *
   * @param {string} entity
   * @param {string} action
   * @returns {*}
     */
  static type(entity, action) {
    return entity.toUpperCase() + '_' + action
  }

  static promiseAct = (dispatch, entity) => (actionType, rest) => {
    return new Promise((resolve, reject) => {
      const _rest = Object.assign({}, rest, {resolve, reject})
      const _action = CRUDAct.act(entity)(actionType, _rest)
      dispatch(_action)
    })
  }

  static act = entity => (actionType, rest = {}) => toActionObject(entity, actionType, rest)

}
