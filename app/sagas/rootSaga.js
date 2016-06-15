import { fork, put, take, call } from 'redux-saga/effects';
import {takeEvery} from 'redux-saga';
import ActionType from 'constants/ActionType';
import CRUDActionType from 'constants/CRUDActionType';
import {push} from 'react-router-redux';
import axios from 'axios';

//<editor-fold desc="user login">
function* doUserLogin(action) {
  try {
    const {email, password} = action;
    const response = yield call(axios, {
      url: '/api/auth/login',
      method: 'post',
      data: {
        email: email,
        password: password
      }
    });
    yield put({ type: ActionType.LOGIN_USER_SUCCESS, response});
    yield put(push('/'))
  } catch(err) {
    yield put({ type: ActionType.LOGIN_USER_ERROR });
  }
}
function* watchUserLogin() {
  yield* takeEvery(ActionType.LOGIN_USER_REQUESTED, doUserLogin);
}
//</editor-fold>

//<editor-fold desc="user logout">
function* doUserLogout(action) {
  try {
    yield call(axios, {
      url: '/api/auth/logout',
      method: 'post'
    });
    yield put({ type: ActionType.LOGOUT_USER_SUCCESS});
    yield put(push('/'))
  } catch(err) {
    yield put({ type: ActionType.LOGOUT_USER_ERROR });
  }
}
function* watchUserLogout() {
  yield* takeEvery(ActionType.LOGOUT_USER_REQUESTED, doUserLogout);
}
//</editor-fold>

// CRUD Saga

function doTournamentList(action) {
  try {
    const response = yield call(axios, {
      url: '/api/tournament',
      method: 'get',
      params: {
        limit: action.limit,
        offset: action.offset
      }
    });
    yield put({type: ActionType.TOURNAMENT_LIST_SUCCESS, records: response.records});
  } catch(err) {
    yield put({ type: ActionType.TOURNAMENT_LIST_ERROR, error: err});
  }
}

function watchTournamentList() {
  yield* takeEvery(ActionType.TOURNAMENT_LIST_REQUESTED, doTournamentList);
}

export default function* rootSaga() {
  yield [
    fork(watchUserLogin),
    fork(watchUserLogout),
    fork(watchTournamentList)
  ];
}