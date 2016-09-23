import {fork} from 'redux-saga/effects'

import crudSaga from './crudSaga'
import fkSaga from './fkSaga'
import authSaga from './authSaga'
import rrfSaga from './rrfSaga'

export default function* rootSaga() {
  yield [
    fork(authSaga),
    fork(crudSaga('tournament')),
    fork(crudSaga('match')),
    fork(crudSaga('target')),
    fork(crudSaga('competitor')),
    fork(crudSaga('matchCompetitor')),
    fork(crudSaga('exercise')),

    fork(fkSaga('tournament', '1')),
    fork(fkSaga('competitor', '1')),
    fork(fkSaga('exercise', '1')),
    fork(fkSaga('target', '1')),
    fork(rrfSaga('exercise'))
  ]
}
