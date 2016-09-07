import CRUDAct from 'constants/CRUDAct'
import Act from 'constants/Act'
import {fork, put, call, select} from 'redux-saga/effects'
import {takeEvery} from 'redux-saga'
import axios from 'axios'
import {actions} from 'react-redux-form'
import {push} from 'react-router-redux'
import {rrfModel, rrfField, formatServerError} from 'utils/Util'
import snakeCase from 'lodash/snakeCase'
import noop from 'lodash/noop'

export default function crudSaga(entity, params = {}) {
  const act = CRUDAct.act(entity)
  const type = t => CRUDAct.type(entity, t)
  const endpoint = params.endpoint || snakeCase(entity)

  function* setValidationErrors(fieldErrors) {
    if (!fieldErrors) {
      return
    }
    for (const k in fieldErrors) {
      if (!fieldErrors.hasOwnProperty(k)) continue
      yield put(actions.setErrors(rrfField(entity, k), fieldErrors[k].message))
    }
  }

  function* read({id, resolve = noop, reject = noop}) {
    try {
      const response = yield call(axios, {
        url: `/api/${endpoint}/${id}`,
        method: 'get'
      })
      const record = response.data
      yield put(act(CRUDAct.READ_SUCCESS, {record}))
      yield put(actions.load(rrfModel(entity), record))
      yield call(resolve, record)
    } catch (err) {
      if (err.status === 401) {
        yield put({type: Act.AUTH_REQUIRED})
      } else {
        yield put(act(CRUDAct.READ_ERROR, formatServerError(err)))
      }
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
      yield call(reject, err)
    }
  }

  function* create({record, nextPath, resolve = noop, reject = noop}) {
    try {
      const response = yield call(axios, {
        url: `/api/${endpoint}`,
        method: 'put',
        data: record
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
      yield call(reject, err)
    }
  }

  function* list({
    resolve = noop,
    reject = noop
  }) {
    const listParams = select((state) => ({
      offset: state[entity].listOffset,
      limit: state[entity].listLimit,
      sortBy: state[entity].listSortBy,
      filter: state[entity].listFilter ? JSON.stringify(state[entity].listFilter) : null,
      sortDirection: state[entity].listSortDirection,
    }))
    try {
      const response = yield call(axios, {
        url: `/api/${endpoint}`,
        method: 'get',
        params: listParams
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
      yield call(reject, err)
    }
  }

  function* update({record, nextPath, resolve = noop, reject = noop}) {
    try {
      const response = yield call(axios, {
        url: `/api/${endpoint}/${record.id}`,
        method: 'post',
        data: record
      })
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
      yield call(reject, err)
    }
  }

  return function* crudSaga1() {
    yield [
      fork(function* watchRead() { yield* takeEvery(type(CRUDAct.READ_REQUESTED), read) }),
      fork(function* watchRead() { yield* takeEvery(type(CRUDAct.READ_REQUESTED), read) }),
      fork(function* watchListSort() { yield* takeEvery(type(CRUDAct.LIST_SORT), list) }),
      fork(function* watchList() { yield* takeEvery(type(CRUDAct.LIST_REQUESTED), list) }),
      fork(function* watchCreate() { yield* takeEvery(type(CRUDAct.CREATE_REQUESTED), create) }),
      fork(function* watchUpdate() { yield* takeEvery(type(CRUDAct.UPDATE_REQUESTED), update) }),
      fork(function* watchDelete() { yield* takeEvery(type(CRUDAct.DELETE_REQUESTED), del) })
    ]
  }
}
