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
function* doUserLogout() {
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

function* doTournamentRead(action) {
  try {
    const response = yield call(axios, {
      url: `/api/tournament/${action.id}`,
      method: 'get'
    });
    yield put({type: ActionType.TOURNAMENT_READ_SUCCESS, record: response.data});
  } catch(err) {
    yield put({ type: ActionType.TOURNAMENT_READ_ERROR, error: err});
  }
}

function* watchTournamentRead() {
  yield* takeEvery(ActionType.TOURNAMENT_READ_REQUESTED, doTournamentRead);
}


function* doTournamentDelete(action) {
  try {
    yield call(axios, {
      url: `/api/tournament/${action.id}`,
      method: 'delete'
    });
    yield put({type: ActionType.TOURNAMENT_DELETE_SUCCESS});
    yield put({type: ActionType.TOURNAMENT_LIST_REQUESTED});
  } catch(err) {
    yield put({ type: ActionType.TOURNAMENT_DELETE_ERROR, error: err});
  }
}

function* watchTournamentDelete() {
  yield* takeEvery(ActionType.TOURNAMENT_DELETE_REQUESTED, doTournamentDelete);
}

function* doTournamentAdd(action) {
  console.log("do tournament add");
  console.log(action);
  try {
    const response = yield call(axios, {
      url: '/api/tournament',
      method: 'put',
      data: action.model
    });
    yield put({type: ActionType.TOURNAMENT_CREATE_SUCCESS, record: response.data});
    yield put(push('/tournament'));
  } catch(err) {
    yield put({ type: ActionType.TOURNAMENT_CREATE_ERROR, error: err});
  }
}
function* watchTournamentAdd() {
  yield* takeEvery(ActionType.TOURNAMENT_CREATE_REQUESTED, doTournamentAdd);
}

function* doTournamentList(action) {
  try {
    const response = yield call(axios, {
      url: '/api/tournament',
      method: 'get',
      params: {
        page: action.page
      }
    });
    yield put({type: ActionType.TOURNAMENT_LIST_SUCCESS, records: response.data});
  } catch(err) {
    yield put({ type: ActionType.TOURNAMENT_LIST_ERROR, error: err});
  }
}

function* watchTournamentList() {
  yield* takeEvery(ActionType.TOURNAMENT_LIST_REQUESTED, doTournamentList);
}

export default function* rootSaga() {
  yield [
    fork(watchUserLogin),
    fork(watchUserLogout),
    fork(watchTournamentList),
    fork(watchTournamentAdd),
    fork(watchTournamentDelete),
    fork(watchTournamentRead),

  ];
}