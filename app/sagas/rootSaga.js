import { fork } from 'redux-saga';
import loginSaga from './loginSaga';

export default function* root() {
  yield fork(loginSaga);
}