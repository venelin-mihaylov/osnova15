import FKAct from 'constants/FKAct'
import {fork, put, call} from 'redux-saga/effects'
import {takeEvery} from 'redux-saga'
import axios from 'axios'
import {formatServerError, mergeDeep, act as _act, prefixType} from 'utils/Util'
import curry from 'lodash/curry'
import noop from 'lodash/noop'

export default function fkSaga(entity, variation) {
  const act = curry(_act)(entity, variation)
  const type = curry(prefixType)(entity, variation)

  function* read({name, id, resolve = noop, reject = noop}) {
    if (!id) {
      yield put(act(FKAct.FK_READ_SUCCESS, {name, valueRecord: null}))
      yield call(resolve, null)
      return
    }

    try {
      const {data: record} = yield call(axios, {
        url: `/api/${entity}/${id}`,
        method: 'get'
      })
      yield put(act(FKAct.FK_READ_SUCCESS, {
        name,
        id,
        record
      }))
      yield call(resolve, record)
    } catch (err) {
      yield put(act(FKAct.FK_READ_ERROR, {name, ...formatServerError(err)}))
      yield call(reject, err)
    }
  }

  /**
   *
   */
  function* list({name, listParams, searchText, resolve = noop, reject = noop}) {
    try {
      const params = mergeDeep(listParams || {}, searchText ? {filter: {searchText}} : {})
      const {data: records} = yield call(axios, {
        url: `/api/${entity}`,
        method: 'get',
        params
      })
      yield put(act(FKAct.FK_LIST_SUCCESS, {
        name,
        records
      }))
      yield call(resolve, records)
    } catch (err) {
      yield put(act(FKAct.FK_LIST_ERROR, {name, ...formatServerError(err)}))
      yield call(reject, err)
    }
  }

  return function* fkSaga1() {
    yield [
      fork(function* watchRead() { yield* takeEvery(type(FKAct.FK_READ_REQUESTED), read) }),
      fork(function* watchList() { yield* takeEvery(type(FKAct.FK_LIST_REQUESTED), list) }),
    ]
  }
}
