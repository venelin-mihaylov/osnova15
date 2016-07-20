import { fork, put, take, call } from 'redux-saga/effects'
import {takeEvery} from 'redux-saga'
import ActionType from 'constants/ActionType'
import {push} from 'react-router-redux'
import axios from 'axios'
import CRUDSaga from './CRUDSaga'
import FKSaga from './FKSaga'

//<editor-fold desc="user login">
function* doUserLogin(action) {
  try {
    const {email, password} = action
    const response = yield call(axios, {
      url: '/api/auth/login',
      method: 'post',
      data: {
        email: email,
        password: password
      }
    })
    yield put({ type: ActionType.LOGIN_USER_SUCCESS, response})
    yield put(push('/'))
  } catch(err) {
    yield put({ type: ActionType.LOGIN_USER_ERROR })
  }
}
function* watchUserLogin() {
  yield* takeEvery(ActionType.LOGIN_USER_REQUESTED, doUserLogin)
}
//</editor-fold>

//<editor-fold desc="user logout">
function* doUserLogout() {
  try {
    yield call(axios, {
      url: '/api/auth/logout',
      method: 'post'
    })
    yield put({ type: ActionType.LOGOUT_USER_SUCCESS})
    yield put(push('/'))
  } catch(err) {
    yield put({ type: ActionType.LOGOUT_USER_ERROR })
  }
}
function* watchUserLogout() {
  yield* takeEvery(ActionType.LOGOUT_USER_REQUESTED, doUserLogout)
}
//</editor-fold>

export default function* rootSaga() {
  yield [
    fork(watchUserLogin),
    fork(watchUserLogout),

    fork(CRUDSaga('tournament')),
    fork(CRUDSaga('match')),
    fork(CRUDSaga('target')),
    fork(CRUDSaga('competitor')),
    fork(CRUDSaga('matchCompetitor')),
    fork(CRUDSaga('exercise')),
    fork(CRUDSaga('matchExercise')),

    fork(FKSaga('tournament', '1')),
    fork(FKSaga('competitor', '1')),
    fork(FKSaga('exercise', '1')),
    fork(FKSaga('target', '1')),
  ]
}