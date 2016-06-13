import { fork, put, take, call } from 'redux-saga/effects';
import {takeEvery} from 'redux-saga';
import ActionType from 'constants/ActionType';
import axios from 'axios';
//import loginSaga from './loginSaga';

function* doUserLogin(data) {
  try {
    const data = yield call(axios, {
      url: '/api/login',
      method: 'post',
      data: data,
      withCredentials: true
    });
    yield put({ type: ActionType.LOGIN_USER_SUCCESS, data});
  } catch(err) {
    yield put({ type: ActionType.LOGIN_USER_ERROR });
  }
}

function* watchUserLogin() {
    yield* takeEvery(ActionType.LOGIN_USER_REQUESTED, doUserLogin);
}

export default function* rootSaga() {
  yield [
    fork(watchUserLogin)
  ];
}