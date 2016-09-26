/* eslint-disable no-console */
import CRUDAct from 'constants/CRUDAct'
import Act from 'constants/Act'
import {fork, put, call, select} from 'redux-saga/effects'
import {takeEvery} from 'redux-saga'
import axios from 'axios'
import {actions} from 'react-redux-form'
import {push} from 'react-router-redux'
import {rrfModel, rrfField, formatServerError, act as _act, prefixType, listStatePath} from 'utils/Util'
import snakeCase from 'lodash/snakeCase'
import noop from 'lodash/noop'
import curry from 'lodash/curry'
import pick from 'lodash/pick'
import isArray from 'lodash/isArray'
import isObject from 'lodash/isObject'

export default function crudSaga(entity, variation = '1', options = {}) {
  const act = curry(_act)(entity, variation)
  const type = curry(prefixType)(entity, variation)
  const endpoint = options.endpoint || snakeCase(entity)

  function* setValidationErrors(fieldErrors) {
    if (!fieldErrors) {
      return
    }
    yield put(actions.setFieldsErrors(rrfModel(entity), fieldErrors))
  }

  function* rrfSetValid(record) {
    for (const f in record) {
      if (!record.hasOwnProperty(f)) continue
      yield put(actions.setValidity(rrfField(entity, f), true))
      if (isArray(record[f])) {
        for (let i = 0; i < record[f].length; i++) {
          if (isObject(record[f][i])) {
            for (const j in record[f][i]) {
              if (!record[f][i].hasOwnProperty(j)) continue
              const ff = `${f}[${i}].${j}`
              yield put(actions.setValidity(rrfField(entity, ff), true))
            }
          }
        }
      }
    }
  }

  function* rrfSetPristine(record) {
    for (const f in record) {
      if (!record.hasOwnProperty(f)) continue
      yield put(actions.setPristine(rrfField(entity, f), true))
      if (isArray(record[f])) {
        for (let i = 0; i < record[f].length; i++) {
          if (isObject(record[f][i])) {
            for (const j in record[f][i]) {
              if (!record[f][i].hasOwnProperty(j)) continue
              const ff = `${f}[${i}].${j}`
              yield put(actions.setPristine(rrfField(entity, ff), true))
            }
          }
        }
      }
    }
  }

  function* read({id, resolve = noop, reject = noop}) {
    try {
      const {data: record} = yield call(axios, {
        url: `/api/${endpoint}/${id}`,
        method: 'get'
      })
      yield put(act(CRUDAct.READ_SUCCESS, {record}))
      yield put(actions.load(rrfModel(entity), record))
      yield rrfSetValid(record)
      yield rrfSetPristine(record)
      yield call(resolve, record)
    } catch (err) {
      if (err.status === 401) {
        yield put({type: Act.AUTH_REQUIRED})
      } else {
        yield put(act(CRUDAct.READ_ERROR, formatServerError(err)))
      }
      console.log(err)
      console.log(err.stack)
      yield call(reject, err)
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
      if (err.status === 401) {
        yield put({type: Act.AUTH_REQUIRED})
      } else {
        yield put(act(CRUDAct.DELETE_ERROR, formatServerError(err)))
      }
      console.log(err)
      console.log(err.stack)
      yield call(reject, err)
    }
  }

  function* create({record, nextPath, params = {}, resolve = noop, reject = noop}) {
    try {
      const response = yield call(axios, {
        url: `/api/${endpoint}`,
        method: 'put',
        data: {
          params,
          record
        }
      })
      const created = response.data
      yield put(act(CRUDAct.CREATE_SUCCESS, {record: created}))
      if (nextPath) {
        yield put(push(nextPath))
      }
      yield call(resolve, created)
    } catch (err) {
      if (err.status === 401) {
        yield put({type: Act.AUTH_REQUIRED})
      } else {
        const err2 = formatServerError(err)
        yield put(act(CRUDAct.CREATE_ERROR, err2))
        const {fieldErrors} = err2
        yield setValidationErrors(fieldErrors)
      }
      console.log(err)
      console.log(err.stack)
      yield call(reject, err)
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
      const response = yield call(axios, {
        url: `/api/${endpoint}`,
        method: 'get',
        params
      })
      const records = response.data
      yield put(act(CRUDAct.LIST_SUCCESS, {records}))
      yield call(resolve, records)
    } catch (err) {
      if (err.status === 401) {
        yield put({type: Act.AUTH_REQUIRED})
      } else {
        yield put(act(CRUDAct.LIST_ERROR, formatServerError(err)))
      }
      console.log(err)
      console.log(err.stack)
      yield call(reject, err)
    }
  }

  function* update({record, nextPath, params = {}, resolve = noop, reject = noop}) {
    try {
      yield put(actions.setPending(rrfModel(entity), true))
      const response = yield call(axios, {
        url: `/api/${endpoint}/${record.id}`,
        method: 'post',
        data: {
          params,
          record
        }
      })
      yield put(actions.setSubmitted(rrfModel(entity), true))
      const updated = response.data
      yield put(act(CRUDAct.UPDATE_SUCCESS, {record: updated}))
      if (nextPath) {
        yield put(push(nextPath))
      }
      yield call(resolve, updated)
    } catch (err) {
      if (err.status === 401) {
        yield put({type: Act.AUTH_REQUIRED})
      } else {
        const err2 = formatServerError(err)
        yield put(act(CRUDAct.UPDATE_ERROR, err2))
        const {fieldErrors} = err2
        yield setValidationErrors(fieldErrors)
      }
      console.log(err)
      console.log(err.stack)
      yield call(reject, err)
    }
  }

  return function* crudSaga1() {
    yield [
      fork(function* watchRead() { yield* takeEvery(type(CRUDAct.READ_REQUESTED), read) }),
      fork(function* watchListSort() { yield* takeEvery(type(CRUDAct.LIST_SORT), list) }),
      fork(function* watchList() { yield* takeEvery(type(CRUDAct.LIST_REQUESTED), list) }),
      fork(function* watchCreate() { yield* takeEvery(type(CRUDAct.CREATE_REQUESTED), create) }),
      fork(function* watchUpdate() { yield* takeEvery(type(CRUDAct.UPDATE_REQUESTED), update) }),
      fork(function* watchDelete() { yield* takeEvery(type(CRUDAct.DELETE_REQUESTED), del) })
    ]
  }
}
