/* eslint-disable no-console */
import CRUDAct from 'constants/CRUDAct'
import Act from 'constants/Act'
import {fork, put, call, select} from 'redux-saga/effects'
import {takeEvery} from 'redux-saga'
import axios from 'axios'
import {actions} from 'react-redux-form'
import {rrfModel, formatServerError, act as _act, prefixType, listStatePath} from 'utils/Util'
import snakeCase from 'lodash/snakeCase'
import noop from 'lodash/noop'
import curry from 'lodash/curry'
import pick from 'lodash/pick'

function* setValidationErrors(entity, fieldErrors) {
  if (!fieldErrors) {
    return
  }
  yield put(actions.setFieldsErrors(rrfModel(entity), fieldErrors))
}

function* handleException(entity, err, reject, act, action) {
  if (err.status === 401) {
    yield put({type: Act.AUTH_REQUIRED})
  } else {
    const err2 = formatServerError(err)
    yield put(act(action, err2))
    yield setValidationErrors(entity, err2.fieldErrors)
  }
  console.log(err)
  console.log(err.stack)
  yield call(reject, err)
}

export default function crudSaga(entity, variation = '1', options = {}) {
  const act = curry(_act)(entity, variation)
  const type = curry(prefixType)(entity, variation)
  const endpoint = options.endpoint || snakeCase(entity)

  function* read({id, resolve = noop, reject = noop}) {
    try {
      const {data: record} = yield call(axios, {
        url: `/api/${endpoint}/${id}`,
        method: 'get'
      })
      yield put(act(CRUDAct.READ_SUCCESS, {record}))
      yield call(resolve, record)
    } catch (err) {
      yield handleException(entity, err, reject, act, CRUDAct.READ_ERROR)
    }
  }

  function* del({id, resolve = noop, reject = noop}) {
    try {
      yield call(axios, {
        url: `/api/${endpoint}/${id}`,
        method: 'delete'
      })
      yield put(act(CRUDAct.DELETE_SUCCESS))
      yield call(resolve, id)
    } catch (err) {
      yield handleException(entity, err, reject, act, CRUDAct.DELETE_ERROR)
    }
  }

  function* create({record, params = {}, resolve = noop, reject = noop}) {
    try {
      const {data: created} = yield call(axios, {
        url: `/api/${endpoint}`,
        method: 'put',
        data: {
          params,
          record
        }
      })
      yield put(act(CRUDAct.CREATE_SUCCESS, {record: created}))
      yield call(resolve, created)
    } catch (err) {
      yield handleException(entity, err, reject, act, CRUDAct.CREATE_ERROR)
    }
  }

  function* list({
    resolve = noop,
    reject = noop
  }) {
    const params = yield select(state => pick(state[listStatePath(entity, variation)], [
      'variation',
      'page',
      'limit',
      'orderBy',
      'orderDirection',
      'baseFilter',
      'filter'
    ]))

    const baseFilter = params.baseFilter
    delete params.baseFilter
    if (baseFilter || params.filter) {
      params.filter = JSON.stringify(Object.assign({}, params.filter, baseFilter))
    }

    try {
      const {data: records} = yield call(axios, {
        url: `/api/${endpoint}`,
        method: 'get',
        params
      })
      yield put(act(CRUDAct.LIST_SUCCESS, {records}))
      yield call(resolve, records)
    } catch (err) {
      yield handleException(entity, err, reject, act, CRUDAct.LIST_ERROR)
    }
  }

  /**
   *
   * @param {object} record - Pass record to update single record
   * @param {object} records - Pass records to update multiple records
   * @param params
   * @param resolve
   * @param reject
   */
  function* update({record, records, params = {}, resolve = noop, reject = noop}) {
    try {
      yield put(actions.setPending(rrfModel(entity), true))
      const axiosParams = {
        url: record ? `/api/${endpoint}/${record.id}` : `/api/${endpoint}`,
        method: 'post',
        data: {
          params,
          record,
          records
        }
      }
      const {data: updated} = yield call(axios, axiosParams)
      yield put(actions.setSubmitted(rrfModel(entity), true))
      yield put(act(CRUDAct.UPDATE_SUCCESS, record ? {record: updated} : {records: updated}))
      yield call(resolve, updated)
    } catch (err) {
      yield handleException(entity, err, reject, act, CRUDAct.UPDATE_ERROR)
    }
  }

  return function* crudSaga1() {
    yield [
      fork(function* watchRead() { yield* takeEvery(type(CRUDAct.READ_REQUESTED), read) }),
      fork(function* watchList() { yield* takeEvery(type(CRUDAct.LIST_REQUESTED), list) }),
      fork(function* watchCreate() { yield* takeEvery(type(CRUDAct.CREATE_REQUESTED), create) }),
      fork(function* watchUpdate() { yield* takeEvery(type(CRUDAct.UPDATE_REQUESTED), update) }),
      fork(function* watchDelete() { yield* takeEvery(type(CRUDAct.DELETE_REQUESTED), del) })
    ]
  }
}
