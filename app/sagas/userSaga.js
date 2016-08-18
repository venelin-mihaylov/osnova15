import {fork, put, call} from 'redux-saga/effects'
import {takeEvery} from 'redux-saga'
import Act from 'constants/Act'
import {push} from 'react-router-redux'
import axios from 'axios'

export default function userSaga() {
  function* doUserLogin(data) {
    try {
      const response = yield call(axios, {
        url: '/api/auth/login',
        method: 'post',
        data
      })
      yield put({type: Act.LOGIN_USER_SUCCESS, response})
      yield put(push('/'))
    } catch (err) {
      yield put({type: Act.LOGIN_USER_ERROR})
    }
  }
  function* doUserLogout() {
    try {
      yield call(axios, {
        url: '/api/auth/logout',
        method: 'post'
      })
      yield put({type: Act.LOGOUT_USER_SUCCESS})
      yield put(push('/'))
    } catch (err) {
      yield put({type: Act.LOGOUT_USER_ERROR})
    }
  }

  return function* userSaga1() {
    yield [
      fork(function* watchLogin() { yield* takeEvery(Act.LOGIN_USER_REQUESTED, doUserLogin) }),
      fork(function* watchLogout() { yield* takeEvery(Act.LOGOUT_USER_REQUESTED, doUserLogout) }),
    ]
  }
}
