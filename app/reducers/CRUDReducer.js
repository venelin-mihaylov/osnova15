import CRUDAct from '../constants/CRUDAct'

export default function CRUDReducer({
  entity
}) {
  const addPrefix = type => `${entity.toUpperCase()}_${type}`

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
    listError: false, // list error
    listSelectedId: null, // list selection id
    listSelectedRecord: null, // list selection record
    listLoading: false, // are loading the list from the server
    listRecords: [], // list record
    listFilter: null, // list filters
    listPage: 1, // list page
    listLimit: 100 // list limit
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
      case addPrefix(CRUDAct.LIST_REQUESTED):
        return Object.assign({}, state, {
          params: action.params,
          listLoading: true,
          listRecords: [],
          listError: null,
          listPage: action.page,
          listFilter: action.filter
        })
      case addPrefix(CRUDAct.LIST_SUCCESS):
        return Object.assign({}, state, {
          listLoading: false,
          listRecords: action.records,
          listError: null
        })
      case addPrefix(CRUDAct.LIST_ERROR):
        return Object.assign({}, state, {
          listLoading: false,
          listError: action.globalError,
          listRecords: []
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
      case addPrefix(CRUDAct.LIST_SET_LIMIT):
        return Object.assign({}, state, {
          listLimit: action.limit
        })
      case addPrefix(CRUDAct.LIST_SET_PAGE):
        return Object.assign({}, state, {
          listPage: action.page
        })
      case addPrefix(CRUDAct.RESET_FORM):
        return Object.assign({}, state, {
          resetForm: action.value,
        })
      case addPrefix(CRUDAct.SELECT_CREATED_FK_RECORD):
        return Object.assign({}, state, {
          selectCreatedFK: action.value
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
      case addPrefix(CRUDAct.LIST_SET_SELECTION):
        if (state.listSelectedId === action.id) {
          let listRecords = action.records
          if (Array.isArray(action.records && action.records)) {
            listRecords = action.records.map(r => {
              if (r.selected) {
                const {selected, ...ret} = r // eslint-disable-line no-unused-vars
                return ret
              }
              return r
            })
          }
          return Object.assign({}, state, {
            listSelectedId: null,
            listSelectedRecord: null,
            listRecords
          })
        }
        return Object.assign({}, state, {
          listSelectedId: action.id,
          listSelectedRecord: action.record,
          listRecords: action.records
        })
      case addPrefix(CRUDAct.LIST_CLEAR_SELECTION):
        return Object.assign({}, state, {
          listSelectedId: null,
          listSelectedRecord: null
        })
      default:
        return state
    }
  }
}
