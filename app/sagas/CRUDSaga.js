import CRUDAct from 'constants/CRUDAct'
import { fork, put, take, call, select } from 'redux-saga/effects'
import {takeEvery} from 'redux-saga'
import axios from 'axios'
import {actions} from "react-redux-form"
import {formModel, formModelField} from "utils/Util"
import {push} from 'react-router-redux'
import {formatServerError, camelCaseToUnderscore} from 'utils/Util'

export default function CRUDSaga(entity) {
  const act = CRUDAct.act(entity)
  const type = type => CRUDAct.prefixType(entity, type)
  const endpoint = camelCaseToUnderscore(entity)

  function* read({id}) {
    try {
      const response = yield call(axios, {
        url: `/api/${endpoint}/${id}`,
        method: 'get'
      })
      yield put(act(CRUDAct.READ_SUCCESS, {record: response.data}))
      yield put(actions.load(formModel(entity), response.data))
    } catch(err) {
      yield put(act(CRUDAct.READ_ERROR, formatServerError(err)))
    }
  }

  function* doDelete({id}) {
    try {
      yield call(axios, {
        url: `/api/${endpoint}/${id}`,
        method: 'delete'
      })
      yield put(act(CRUDAct.DELETE_SUCCESS))
      yield put(act(CRUDAct.LIST_REQUESTED))
    } catch(err) {
      yield put(act(CRUDAct.DELETE_ERROR, formatServerError(err)))
    }
  }

  function* create({record, nextUri = `/${entity}`}) {
    try {
      const response = yield call(axios, {
        url: `/api/${endpoint}`,
        method: 'put',
        data: record
      })
      yield put(act(CRUDAct.CREATE_SUCCESS, {record: response.data}))
      if(nextUri) yield put(push(nextUri))
    } catch(err) {
      yield put(act(CRUDAct.CREATE_ERROR, formatServerError(err)))
    }
  }

  function* list({page, filter}) {
    try {
      const response = yield call(axios, {
        url: `/api/${endpoint}`,
        method: 'get',
        params: {
          page: page,
          filter: filter ? JSON.stringify(filter) : null
        }
      })
      yield put(act(CRUDAct.LIST_SUCCESS, {records: response.data}))
    } catch(err) {
      yield put(act(CRUDAct.LIST_ERROR, formatServerError(err)))
    }
  }

  /**
   */
  function* update({record, nextUri = `/${entity}`}) {
    try {
      const response = yield call(axios, {
        url: `/api/${endpoint}/${record.id}`,
        method: 'post',
        data: record
      })
      yield put(act(CRUDAct.UPDATE_SUCCESS, {record: response.data}))
      if(nextUri) yield put(push(nextUri))
    } catch(err) {
      let err2 = formatServerError(err), {fieldErrors} = err2
      yield put(act(CRUDAct.UPDATE_ERROR, err2))
      for(let k in fieldErrors) {
        if(!fieldErrors.hasOwnProperty(k)) continue
        yield put(actions.setErrors(formModelField(entity, k), fieldErrors[k].message))
      }
    }
  }

  return function* root() {
    yield [
      fork(function* () {yield* takeEvery(type(CRUDAct.READ_REQUESTED), read)}),
      fork(function* () {yield* takeEvery(type(CRUDAct.LIST_REQUESTED), list)}),
      fork(function* () {yield* takeEvery(type(CRUDAct.CREATE_REQUESTED), create)}),
      fork(function* () {yield* takeEvery(type(CRUDAct.UPDATE_REQUESTED), update)}),
      fork(function* () {yield* takeEvery(type(CRUDAct.DELETE_REQUESTED), doDelete)})
    ]
  }
}