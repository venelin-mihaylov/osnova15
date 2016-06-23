import CRUDActionType from 'constants/CRUDActionType'
import { fork, put, take, call } from 'redux-saga/effects'
import {takeEvery} from 'redux-saga'
import axios from 'axios'
import {actions} from "react-redux-form"
import {formModel, formModelField} from "utils/Util"
import {push} from 'react-router-redux'
import {formatServerError} from 'utils/Util'

export default function CRUDSaga(entity) {
  const act = CRUDActionType.act(entity)
  const type = type => CRUDActionType.prefixType(entity, type)

  /**
   *
   * @param {action} action
   * @param {int} action.id
   */
  function* read(action) {
    try {
      const response = yield call(axios, {
        url: `/api/${entity}/${action.id}`,
        method: 'get'
      })
      yield put(act(CRUDActionType.READ_SUCCESS, {record: response.data}))
      yield put(actions.load(formModel(entity), response.data))
    } catch(err) {
      yield put(act(CRUDActionType.READ_ERROR, formatServerError(err)))
    }
  }

  /**
   *
   * @param {object} action
   * @param {int} action.id
   */
  function* doDelete(action) {
    try {
      yield call(axios, {
        url: `/api/${entity}/${action.id}`,
        method: 'delete'
      })
      yield put(act(CRUDActionType.DELETE_SUCCESS))
      yield put(act(CRUDActionType.LIST_REQUESTED))
    } catch(err) {
      yield put(act(CRUDActionType.DELETE_ERROR, formatServerError(err)))
    }
  }

  function* create(action) {
    try {
      const response = yield call(axios, {
        url: `/api/${entity}`,
        method: 'put',
        data: action.record
      })
      yield put(act(CRUDActionType.CREATE_SUCCESS, {record: response.data}))
      yield put(push(`/${entity}`))
    } catch(err) {
      yield put(act(CRUDActionType.CREATE_ERROR, formatServerError(err)))
    }
  }

  function* list(action) {
    try {
      const response = yield call(axios, {
        url: `/api/${entity}`,
        method: 'get',
        params: {
          page: action.page
        }
      })
      yield put(act(CRUDActionType.LIST_SUCCESS, {records: response.data}))
    } catch(err) {
      yield put(act(CRUDActionType.LIST_ERROR, formatServerError(err)))
    }
  }

  /**
   *
   * @param action
   * @param {object} action.record
   */
  function* update(action) {
    try {
      const response = yield call(axios, {
        url: `/api/${entity}/${action.record.id}`,
        method: 'post',
        data: action.record
      })
      yield put(act(CRUDActionType.UPDATE_SUCCESS, {record: response.data}))
      yield put(push(`/${entity}`))
    } catch(err) {
      let err2 = formatServerError(err), {fieldErrors} = err2
      yield put(act(CRUDActionType.UPDATE_ERROR, err2))
      for(let k in fieldErrors) {
        if(!fieldErrors.hasOwnProperty(k)) continue
        yield put(actions.setErrors(formModelField(entity, k), fieldErrors[k].message))
      }
    }
  }

  return function* root() {
    yield [
      fork(function* () {yield* takeEvery(type(CRUDActionType.READ_REQUESTED), read)}),
      fork(function* () {yield* takeEvery(type(CRUDActionType.LIST_REQUESTED), list)}),
      fork(function* () {yield* takeEvery(type(CRUDActionType.CREATE_REQUESTED), create)}),
      fork(function* () {yield* takeEvery(type(CRUDActionType.UPDATE_REQUESTED), update)}),
      fork(function* () {yield* takeEvery(type(CRUDActionType.DELETE_REQUESTED), doDelete)})
    ]
  }
}