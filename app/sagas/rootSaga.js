import {fork} from 'redux-saga/effects'

import crudSaga from './CRUDSaga'
import fkSaga from './FKSaga'
import userSaga from './userSaga'

export default function* rootSaga() {
  yield [
    fork(crudSaga('tournament')),
    fork(crudSaga('match')),
    fork(crudSaga('target')),
    fork(crudSaga('competitor')),
    fork(crudSaga('matchCompetitor')),
    fork(crudSaga('exercise')),
    fork(crudSaga('matchExercise')),

    fork(fkSaga('tournament', '1')),
    fork(fkSaga('competitor', '1')),
    fork(fkSaga('exercise', '1')),
    fork(fkSaga('target', '1')),
    fork(userSaga)
  ]
}
