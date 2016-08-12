import {fork} from 'redux-saga/effects'

import CRUDSaga from './CRUDSaga'
import FKSaga from './FKSaga'
import userSaga from './userSaga'

export default function* rootSaga() {
  yield [
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
    fork(userSaga)
  ]
}