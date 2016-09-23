import {fork, put, call} from 'redux-saga/effects'
import {takeEvery} from 'redux-saga'
import {rrfField, rrfModel} from 'utils/Util'
import axios from 'axios'

export default function rrfSaga(entity, variation = '1', options = {}) {
  function* rrfChange({model, value}) {
    if (model === rrfField(entity, 'exercise_target[0]targetId')) {
      console.log(`rrfChange seen: ${value}`)
    }
  }

  return function* rrfSagaX() {
    yield [
      fork(function* watchChange() { yield* takeEvery('rrf/change', rrfChange) }),
    ]
  }
}
