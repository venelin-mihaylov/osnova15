import Act from 'constants/Act'
import {fork, put, call} from 'redux-saga/effects'
import {takeEvery} from 'redux-saga'
import {push} from 'react-router-redux'
import axios from 'axios'

function* login(data) {
  console.log('login')
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
function* logout() {
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

export default function* authSaga() {
  yield [
    fork(function* watchLogin() { yield* takeEvery(Act.LOGIN_USER_REQUESTED, login) }),
    fork(function* watchLogout() { yield* takeEvery(Act.LOGOUT_USER_REQUESTED, logout) }),
  ]
}
