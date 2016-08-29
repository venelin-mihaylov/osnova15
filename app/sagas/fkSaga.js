import FKAct from 'constants/FKAct'
import {fork, put, call} from 'redux-saga/effects'
import {takeEvery} from 'redux-saga'
import axios from 'axios'
import {formatServerError, mergeDeep} from 'utils/Util'

export default function fkSaga(entity, variation) {
  const act = FKAct.act(entity, variation)
  const type = t => FKAct.prefixType(entity, variation, t)

  function* read({id, name}) {
    if (!id) {
      yield put(act(FKAct.FK_READ_SUCCESS, {valueRecord: null}))
      return
    }

    try {
      const response = yield call(axios, {
        url: `/api/${entity}/${id}`,
        method: 'get'
      })
      yield put(act(FKAct.FK_READ_SUCCESS, {
        id,
        name,
        record: response.data
      }))
    } catch (err) {
      yield put(act(FKAct.FK_READ_ERROR, formatServerError(err)))
    }
  }

  /**
   *
   */
  function* list({listParams, searchText}) {
    try {
      const params = mergeDeep(listParams || {}, searchText ? {filter: {searchText}} : {})
      const response = yield call(axios, {
        url: `/api/${entity}`,
        method: 'get',
        params
      })
      yield put(act(FKAct.FK_LIST_SUCCESS, {
        records: response.data
      }))
    } catch (err) {
      yield put(act(FKAct.FK_LIST_ERROR, formatServerError(err)))
    }
  }

  return function* fkSaga1() {
    yield [
      fork(function* watchRead() { yield* takeEvery(type(FKAct.FK_READ_REQUESTED), read) }),
      fork(function* watchList() { yield* takeEvery(type(FKAct.FK_LIST_REQUESTED), list) }),
    ]
  }
}