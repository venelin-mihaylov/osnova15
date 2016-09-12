import CRUDAct from '../constants/CRUDAct'
import {prefixType} from 'utils/Util'
import curry from 'lodash/curry'

export default function crudReducer({
  entity,
  variation = '1'
}) {
  const addPrefix = curry(prefixType)(entity, variation)

  return function CRUD(state = {
    params: null, // params passed by the action, i.e. '{view:basic}', or '{view:extended}'
    message: null, // message to the user, i.e. record loaded/saved successfully, (not an error)
    globalError: null, // general (field unspecific) error, say 'bad input', 'db error', etc.
    fieldErrors: null, // per field error message, i.e {name: 'too short', age: 'required field'}
    loading: false, // are we loading from the server?
    saving: false, // are we saving to the server?
    record: null, //  currently edited record
    savedRecord: null, // the record, which has been just saved
    deleteId: null, // id to delete / deleted id
    resetForm: true, // reset/load the crud form
    selectCreatedFK: false, // flag to look for newly created FK
  }, action = {}) {
    const {type} = action

    switch (type) {
      case addPrefix(CRUDAct.CREATE_REQUESTED):
        return Object.assign({}, state, {
          saving: true
        })
      case addPrefix(CRUDAct.CREATE_SUCCESS):
        return Object.assign({}, state, {
          saving: false,
          savedRecord: action.record
        })
      case addPrefix(CRUDAct.CREATE_ERROR):
        return Object.assign({}, state, {
          saving: false,
          globalError: action.globalError,
          fieldErrors: action.fieldErrors
        })
      case addPrefix(CRUDAct.READ_REQUESTED):
        return Object.assign({}, state, {
          params: action.params,
          loading: true,
          record: null,
          message: null,
          globalError: null
        })
      case addPrefix(CRUDAct.READ_SUCCESS):
        return Object.assign({}, state, {
          params: action.params,
          loading: false,
          record: action.record,
          message: action.message
        })
      case addPrefix(CRUDAct.READ_ERROR):
        return Object.assign({}, state, {
          params: action.params,
          loading: false,
          globalError: action.globalError || 'Error occurred',
          record: null
        })
      case addPrefix(CRUDAct.UPDATE_REQUESTED):
        return Object.assign({}, state, {
          params: action.params,
          saving: true,
          globalError: null,
          fieldErrors: null
        })
      case addPrefix(CRUDAct.UPDATE_SUCCESS):
        return Object.assign({}, state, {
          params: action.params,
          saving: false,
          savedRecord: action.record
        })
      case addPrefix(CRUDAct.UPDATE_ERROR):
        return Object.assign({}, state, {
          params: action.params,
          saving: false,
          record: action.record,
          globalError: action.globalError || 'Error occurred',
          fieldErrors: action.fieldErrors
        })
      case addPrefix(CRUDAct.DELETE_REQUESTED):
        return Object.assign({}, state, {
          params: action.params,
          saving: true,
          deleteId: action.id
        })
      case addPrefix(CRUDAct.DELETE_SUCCESS):
        return Object.assign({}, state, {
          params: action.params,
          saving: false,
          message: action.message,
          deleteId: action.id
        })
      case addPrefix(CRUDAct.DELETE_ERROR):
        return Object.assign({}, state, {
          params: action.params,
          saving: false,
          globalError: action.globalError || 'Error occurred',
          deleteId: action.id
        })
      case addPrefix(CRUDAct.RESET_FORM):
        return Object.assign({}, state, {
          resetForm: action.value,
        })
      case addPrefix(CRUDAct.RESET):
        return Object.assign({}, state, {
          saving: false,
          loading: false,
          savedRecord: false,
          globalError: false,
          fieldErrors: false,
          selectCreatedFK: false
        })
      case addPrefix(CRUDAct.SELECT_CREATED_FK_RECORD):
        return Object.assign({}, state, {
          selectCreatedFK: action.value
        })
      default:
        return state
    }
  }
}
