import FKAct from 'constants/FKAct'
import isObject from 'lodash/isObject'
import {prefixType} from 'utils/Util'
import curry from 'lodash/curry'

const stateByField = {
  loading: false,
  globalError: null,
  records: [],
  valueRecord: null,
  lastSearchText: null
}

export default function FKReducer(entity, variation = '1') {
  return function (state = {}, action = {}) {
    const prefix = curry(prefixType)(entity, variation)
    const {name, type, ...act} = action

    const curFieldState = isObject(state) && state[name] || stateByField
    let newFieldState = null

    switch (type) {
      case prefix(FKAct.FK_LIST_REQUESTED):
        newFieldState = Object.assign({}, curFieldState, {
          loading: true
        })
        break
      case prefix(FKAct.FK_LIST_SUCCESS):
        newFieldState = Object.assign({}, curFieldState, {
          loading: false,
          records: act.records
        })
        break
      case prefix(FKAct.FK_LIST_ERROR):
        newFieldState = Object.assign({}, curFieldState, {
          loading: false,
          records: [],
          globalError: act.globalError
        })
        break
      case prefix(FKAct.FK_READ_REQUESTED):
        newFieldState = Object.assign({}, curFieldState, {
          loading: true,
        })
        break
      case prefix(FKAct.FK_READ_SUCCESS):
        newFieldState = Object.assign({}, curFieldState, {
          loading: false,
          valueRecord: act.record
        })
        break
      case prefix(FKAct.FK_READ_ERROR):
        newFieldState = Object.assign({}, curFieldState, {
          loading: false,
          globalError: action.globalError
        })
        break
      case prefix(FKAct.FK_RESET):
        newFieldState = Object.assign({}, curFieldState, {
          loading: false,
          records: [],
          valueRecord: null,
          globalError: false
        })
        break
      case prefix(FKAct.FK_CLEAR_SELECTION):
        newFieldState = Object.assign({}, curFieldState, {
          valueRecord: null
        })
        break
      case prefix(FKAct.FK_PRELOAD_RECORD):
        newFieldState = Object.assign({}, curFieldState, {
          valueRecord: act.record
        })
        break
      default:
        newFieldState = curFieldState
    }
    const newState = Object.assign({}, state)
    newState[name] = newFieldState
    return newState
  }
}
