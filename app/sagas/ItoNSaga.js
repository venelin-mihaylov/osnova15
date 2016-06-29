import {takeEvery} from 'redux-saga'
import { fork, put, take, call } from 'redux-saga/effects'
import ItoNActionType from 'constants/ItoNActionType'
import axios from 'axios'
import {formatServerError} from 'utils/Util'

export default function ItoNSaga(entity, relation) {
  const act = ItoNActionType.act(entity, relation)
  const type = type => ItoNActionType.prefixType(entity, relation, type)
  console.log(type(ItoNActionType.I_TO_N_LIST_REQUESTED))

  /**
   *
   * @param parentId
     */
  function* list({parentId}) {
    try {
      const response = yield call(axios, {
        url: `/api/${entity}/${parentId}/${relation}`,
        method: 'get'
      })
      yield put(act(ItoNActionType.I_TO_N_LIST_SUCCESS, {records: response.data}))
    } catch(err) {
      yield put(act(ItoNActionType.I_TO_N_LIST_ERROR, formatServerError(err)))
    }
  }

  /**
   * Update all records in the N relation table for the parent
   *
   */
  function* updateAll({parentId, data}) {

  }

  function* create({parentId, data}) {

  }

  /**
   * Update a single record in the N relation table
   */
  function* update({parentId, data}) {

  }

  /**
   * Delete a single record from the N relation table
   */
  function* doDelete({parentId, id}) {

  }

  return function* root() {
    yield [
      fork(function* () {yield* takeEvery(type(ItoNActionType.I_TO_N_LIST_REQUESTED), list)}),
      fork(function* () {yield* takeEvery(type(ItoNActionType.I_TO_N_UPDATE_REQUESTED), update)})
    ]
  }
}