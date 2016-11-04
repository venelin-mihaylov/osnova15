import Act from 'constants/Act'
import {fork, put, call} from 'redux-saga/effects'
import {takeEvery} from 'redux-saga'
import {push} from 'react-router-redux'
import axios from 'axios'

function* login(data) {
  try {
    const response = yield call(axios, {
      url: '/api/auth/login',
      method: 'post',
      data
    })
    const user = response.data
    yield put({type: Act.LOGIN_USER_SUCCESS, user})
    yield put(push('/'))
  } catch (err) {
    if (err.status === 401) {
      yield put({type: Act.LOGIN_USER_ERROR, error: 'Invalid username or password'})
    } else {
      yield put({type: Act.LOGIN_USER_ERROR, error: 'General server error'})
    }
  }
}
function* logout() {
  try {
    yield call(axios, {
      url: '/api/auth/logout',
      method: 'post'
    })
    yield put({type: Act.LOGOUT_USER_SUCCESS})
    yield put(push('/login'))
  } catch (err) {
    yield put({type: Act.LOGOUT_USER_ERROR})
  }
}

function* authRequired() {
  yield put({type: Act.LOGOUT_USER_SUCCESS})
  yield put({type: Act.EXIT_MATCH})
  yield put({type: Act.FLASH_MESSAGE_START, message: 'Please login'})
  yield put(push('/login'))
}

export default function* authSaga() {
  yield [
    fork(function* watchLogin() { yield* takeEvery(Act.AUTH_REQUIRED, authRequired) }),
    fork(function* watchLogin() { yield* takeEvery(Act.LOGIN_USER_REQUESTED, login) }),
    fork(function* watchLogout() { yield* takeEvery(Act.LOGOUT_USER_REQUESTED, logout) }),
  ]
}
