import { fork, put, take, call } from 'redux-saga/effects'
import {takeEvery} from 'redux-saga'
import ActionType from 'constants/ActionType'
import {push} from 'react-router-redux'
import axios from 'axios'


export default function userSaga() {

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
      yield put({type: ActionType.LOGIN_USER_SUCCESS, response})
      yield put(push('/'))
    } catch (err) {
      yield put({type: ActionType.LOGIN_USER_ERROR})
    }
  }
  function* doUserLogout() {
    try {
      yield call(axios, {
        url: '/api/auth/logout',
        method: 'post'
      })
      yield put({type: ActionType.LOGOUT_USER_SUCCESS})
      yield put(push('/'))
    } catch (err) {
      yield put({type: ActionType.LOGOUT_USER_ERROR})
    }
  }

  return function* userSaga() {
    yield [
      fork(function* watchLogin() {yield* takeEvery(ActionType.LOGIN_USER_REQUESTED), doUserLogin}),
      fork(function* watchLogout() {yield* takeEvery(ActionType.LOGOUT_USER_REQUESTED), doUserLogin}),
    ]
  }

}