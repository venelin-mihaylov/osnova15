"use strict"
import ItoNActionType from "constants/ItoNActionType"

export default function ItoN(entity, relation) {
  const type = type => ItoNActionType.prefixType(entity, relation, type)

  return function ItoN(state = {
    loading: false,
    saving: false,
    listRecords: [],
    listError: null,
    globalError: null,
    fieldErrors: {}

  }, action = {}) {
    switch (action.type) {
      case type(ItoNActionType.I_TO_N_LIST_REQUESTED):
        return Object.assign({}, state, {
          loading: true
        })
      case type(ItoNActionType.I_TO_N_LIST_SUCCESS):
        return Object.assign({}, state, {
          loading: false,
          listRecords: action.records
        })
      case type(ItoNActionType.I_TO_N_LIST_ERROR):
        return Object.assign({}, state, {
          loading: false,
          listRecords: [],
          listError: action.globalError
        })
      case type(ItoNActionType.I_TO_N_UPDATE_REQUESTED):
        return Object.assign({}, state, {
          saving: true
        })
      case type(ItoNActionType.I_TO_N_UPDATE_SUCCESS):
        return Object.assign({}, state, {
          saving: false
        })
      case type(ItoNActionType.I_TO_N_UPDATE_ERROR):
        return Object.assign({}, state, {
          saving: false,
          globalError: action.globalError,
          fieldErrors: action.fieldErrors
        })
      default:
        return state
    }
  }



}

