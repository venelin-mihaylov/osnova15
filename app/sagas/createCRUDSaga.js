import CRUDActionType from 'constants/CRUDActionType';
import { fork, put, take, call } from 'redux-saga/effects';
import {takeEvery} from 'redux-saga';
import axios from 'axios';
import {actions} from "react-redux-form";
import {formModel, formModelField} from "utils/Util";
import {push} from 'react-router-redux';

export default function createCRUDSaga(entity) {
  const act = CRUDActionType.act(entity);
  const type = type => CRUDActionType.prefixType(entity, type);

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
      yield put(act(CRUDActionType.READ_SUCCESS, {record: response.data}));
      yield put(actions.load(formModel(entity), response.data));

    } catch(err) {
      yield put(act(CRUDActionType.READ_SUCCESS, {error: err}));
    }
  }

  function* watchRead() {
    yield* takeEvery(type(CRUDActionType.READ_REQUESTED), read);
  }

  /**
   *
   * @param {object} action
   * @param {int} action.id
   */
  function* doDelete(action) {
    try {
      yield call(axios, {
        url: `/api/${entity}/${action.id}`,
        method: 'delete'
      });
      yield put(act(CRUDActionType.DELETE_SUCCESS));
      yield put(act(CRUDActionType.LIST_REQUESTED));
    } catch(err) {
      yield put(act(CRUDActionType.DELETE_ERROR, {error: err}));
    }
  }

  function* watchDelete() {
    yield* takeEvery(type(CRUDActionType.DELETE_REQUESTED), doDelete);
  }

  function formatError(err) {
    console.log(err);
    if(err.status == 500) {
      return {
        globalError: 'Internal server error'
      }
    } else if(err.status == 422) { // validation
      return err.data
    } else {
      return err.data
    }
  }

  function* create(action) {
    try {
      const response = yield call(axios, {
        url: `/api/${entity}`,
        method: 'put',
        data: action.record
      });
      yield put(act(CRUDActionType.CREATE_SUCCESS, {record: response.data}));
      yield put(push(`/${entity}`));
    } catch(err) {
      yield put(act(CRUDActionType.CREATE_ERROR, formatError(err)));
    }
  }

  function* watchCreate() {
    yield* takeEvery(type(CRUDActionType.CREATE_REQUESTED), create);
  }

  function* list(action) {
    try {
      const response = yield call(axios, {
        url: `/api/${entity}`,
        method: 'get',
        params: {
          page: action.page
        }
      });
      yield put(act(CRUDActionType.LIST_SUCCESS, {records: response.data}));
    } catch(err) {
      yield put(act(CRUDActionType.LIST_ERROR, formatError(err)));
    }
  }

  function* watchList() {
    yield* takeEvery(type(CRUDActionType.LIST_REQUESTED), list);
  }

  /**
   *
   * @param action
   * @param {object} action.record
   */
  function* update(action) {
    try {
      const response = yield call(axios, {
        url: `/api/${entity}/${action.record.id}`,
        method: 'post',
        data: action.record
      });
      yield put(act(CRUDActionType.UPDATE_SUCCESS, {record: response.data}));
      yield put(push(`/${entity}`));
    } catch(err) {
      const {globalError, fieldErrors = {}} = formatError(err);
      yield put(act(CRUDActionType.UPDATE_ERROR, {globalError, fieldErrors}));
      for(var k in fieldErrors) {
        if(!fieldErrors.hasOwnProperty(k)) continue;
        yield put(actions.setErrors(formModelField('tournament', k), fieldErrors[k].message));
      }
    }
  }

  function* watchUpdate() {
    yield* takeEvery(type(CRUDActionType.UPDATE_REQUESTED), update);
  }

  return function* CRUDSaga() {
    yield [
      fork(watchList),
      fork(watchRead),
      fork(watchCreate),
      fork(watchUpdate),
      fork(watchDelete)
    ]
  }
}