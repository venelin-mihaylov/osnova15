import {takeEvery} from 'redux-saga'
import { fork, put, take, call } from 'redux-saga/effects'
import ActionType from 'constants/ActionType'
import axios from 'axios'

export default function matchCompetitorSaga(entity, relation) {
  const act =

  function list({parentId}) {
    try {
      const response = yield call(axios, {
        url: `/api/${entity}/${parentId}/${relation}`,
        method: 'get'
      })
      yield put(act(CRUDActionType.LIST_SUCCESS, {records: response.data}))
    } catch(err) {
      yield put(act(CRUDActionType.LIST_ERROR, formatServerError(err)))
    }

  }

  function update() {

  }



  return function* oneToManySaga() {
    yield [
      fork(function* () { yield takeEvery(ActionType.MATCH_COMPETITOR_LIST_REQUESTED), list }),
      fork(function* () { yield takeEvery(ActionType.MATCH_COMPETITOR_UPDATE_REQUESTED), update })
    ]

  }
}