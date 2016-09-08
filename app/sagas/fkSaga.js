import FKAct from 'constants/FKAct'
import {fork, put, call} from 'redux-saga/effects'
import {takeEvery} from 'redux-saga'
import axios from 'axios'
import {formatServerError, mergeDeep, act as _act, prefixType} from 'utils/Util'
import curry from 'lodash/curry'

export default function fkSaga(entity, variation) {
  const act = curry(_act)(entity, variation)
  const type = curry(prefixType)(entity, variation)

  function* read({name, id}) {
    if (!id) {
      yield put(act(FKAct.FK_READ_SUCCESS, {name, valueRecord: null}))
      return
    }

    try {
      const response = yield call(axios, {
        url: `/api/${entity}/${id}`,
        method: 'get'
      })
      yield put(act(FKAct.FK_READ_SUCCESS, {
        name,
        id,
        record: response.data
      }))
    } catch (err) {
      yield put(act(FKAct.FK_READ_ERROR, {name, ...formatServerError(err)}))
    }
  }

  /**
   *
   */
  function* list({name, listParams, searchText}) {
    try {
      const params = mergeDeep(listParams || {}, searchText ? {filter: {searchText}} : {})
      const response = yield call(axios, {
        url: `/api/${entity}`,
        method: 'get',
        params
      })
      yield put(act(FKAct.FK_LIST_SUCCESS, {
        name,
        records: response.data
      }))
    } catch (err) {
      yield put(act(FKAct.FK_LIST_ERROR, {name, ...formatServerError(err)}))
    }
  }

  return function* fkSaga1() {
    yield [
      fork(function* watchRead() { yield* takeEvery(type(FKAct.FK_READ_REQUESTED), read) }),
      fork(function* watchList() { yield* takeEvery(type(FKAct.FK_LIST_REQUESTED), list) }),
    ]
  }
}
