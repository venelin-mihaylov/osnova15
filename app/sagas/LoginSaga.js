import { take, takeLatest, put, call, fork, select } from 'redux-saga/effects';
import ActionType from '../constants/ActionType';
import axios from 'axios';

export function* manualLogin(data) {
  alert('ok');
  
}

export default function* loginSaga() {
  while(true) {
    const data = yield takeLatest(ActionType.LOGIN_USER_REQUESTED);
    yield put({type: ActionType.LOGIN_USER_SUCCESS});
    alert(data);
  }
}