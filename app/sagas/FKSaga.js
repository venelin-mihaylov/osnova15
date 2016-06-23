import FKActionType from 'constants/FKActionType'
import { fork, put, take, call } from 'redux-saga/effects'
import {takeEvery} from 'redux-saga'
import axios from 'axios'
import {formatServerError} from 'utils/Util'

export default function FKSaga(entity, variation) {
  const act = FKActionType.act(entity, variation)
  const type = type => FKActionType.prefixType(entity, variation, type)

  function renderRecords(records) {
    if (!records) return [];
    return records.map(r => ({text: r.name, value: r.name}))
  }

  /**
   *
   * @param {object} action
   * @param {integer} action.id
   * @param {string} action.labelField
   * @param {int} action.id
   */
  function* read(action) {
    if(!action.id) {
      yield put(act(FKActionType.FK_READ_SUCCESS, {
        valueRecord: null,
        valueLabel: null
      }))
      return
    }

    try {
      const response = yield call(axios, {
        url: `/api/${entity}/${action.id}`,
        method: 'get'
      })
      yield put(act(FKActionType.FK_READ_SUCCESS, {
        valueRecord: response.data,
        valueLabel: response.data[action.labelField]
      }))
    } catch(err) {
      yield put(act(FKActionType.FK_READ_ERROR, formatServerError(err)))
    }
  }

  function* list() {
    try {
      const response = yield call(axios, {
        url: `/api/${entity}`,
        method: 'get'
      })
      yield put(act(FKActionType.FK_LIST_SUCCESS, {
        records: response.data,
        renderedRecords: renderRecords(response.data)
      }))
    } catch(err) {
      yield put(act(FKActionType.FK_LIST_ERROR, formatServerError(err)))
    }
  }

  return function* FKSaga() {
    yield [
      fork(function* () {yield* takeEvery(type(FKActionType.FK_READ_REQUESTED), read)}),
      fork(function* () {yield* takeEvery(type(FKActionType.FK_LIST_REQUESTED), list)}),
    ]
  }
}