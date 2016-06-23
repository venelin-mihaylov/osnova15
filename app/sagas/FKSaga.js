import FKActionType from 'constants/FKActionType';
import { fork, put, take, call } from 'redux-saga/effects';
import {takeEvery} from 'redux-saga';
import axios from 'axios';

export default function FKSaga(entity) {
  const act = FKActionType.act(entity);
  const type = type => FKActionType.prefixType(entity, type);

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
      });
      yield put(act(FKActionType.FK_READ_SUCCESS, {record: response.data}));
    } catch(err) {
      yield put(act(FKActionType.FK_READ_ERROR, {error: err}));
    }
  }

  function* list(action) {
    try {
      const response = yield call(axios, {
        url: `/api/${entity}`,
        method: 'get'
      });
      yield put(act(FKActionType.FK_LIST_SUCCESS, {records: response.data}));
    } catch(err) {
      yield put(act(FKActionType.FK_LIST_SUCCESS, {error: err}));
    }
  }

  return function* FKSaga() {
    yield [
      fork(function* () {yield* takeEvery(type(FKActionType.FK_READ_REQUESTED), read)}),
      fork(function* () {yield* takeEvery(type(FKActionType.FK_LIST_REQUESTED), list)}),
    ];
  }
}