import CRUDAct from '../constants/CRUDAct'
import {prefixType} from 'utils/Util'
import curry from 'lodash/curry'

export default function listReducer({
  entity,
  variation = '1',
  baseFilter = {}
}) {
  const addPrefix = curry(prefixType)(entity, variation)

  return function CRUD(state = {
    message: null, // message to the user, i.e. record loaded/saved successfully, (not an error)
    globalError: null, // general (field unspecific) error, say 'bad input', 'db error', etc.
    fieldErrors: null, // per field error message, i.e {name: 'too short', age: 'required field'}
    loading: false, // are we loading from the server?
    selectedId: null, // list selection id
    selectedRecord: null, // list selection record
    records: [], // list record
    baseFilter, // filter applied to all queries
    filter: {}, // list filters
    sortBy: null, // list sortBy
    sortDirection: null, //
    page: 1, // list page
    limit: 100 // list limit
  }, action = {}) {
    const {type} = action

    switch (type) {
      case addPrefix(CRUDAct.LIST_REQUESTED):
        return Object.assign({}, state, {
          params: action.params,
          loading: true,
          globalError: null
        })
      case addPrefix(CRUDAct.LIST_SUCCESS):
        return Object.assign({}, state, {
          loading: false,
          records: action.records,
          globalError: null
        })
      case addPrefix(CRUDAct.LIST_ERROR):
        return Object.assign({}, state, {
          loading: false,
          globalError: action.globalError,
          records: []
        })
      case addPrefix(CRUDAct.LIST_SET_LIMIT):
        return Object.assign({}, state, {
          limit: action.value
        })
      case addPrefix(CRUDAct.LIST_SET_PAGE):
        return Object.assign({}, state, {
          page: action.value
        })
      case addPrefix(CRUDAct.LIST_SET_SORT):
        return Object.assign({}, state, {
          sortBy: action.sortBy,
          sortDirection: action.sortDirection
        })
      case addPrefix(CRUDAct.LIST_SET_FILTER):
        return Object.assign({}, state, {
          filter: Object.assign({}, state.filter, action.value)
        })
      case addPrefix(CRUDAct.LIST_SET_BASE_FILTER):
        return Object.assign({}, state, {
          filter: Object.assign({}, state.baseFilter, action.value)
        })
      case addPrefix(CRUDAct.LIST_SET_SELECTION):
        if (state.selectedId === action.id) {
          let records = action.records
          if (Array.isArray(action.records) && action.records.length > 0) {
            records = action.records.map(r => {
              if (r.selected) {
                const {selected, ...ret} = r // eslint-disable-line no-unused-vars
                return ret
              }
              return r
            })
          }
          return Object.assign({}, state, {
            selectedId: null,
            selectedRecord: null,
            records
          })
        }
        return Object.assign({}, state, {
          selectedId: action.id,
          selectedRecord: action.record,
          records: action.records
        })
      case addPrefix(CRUDAct.LIST_CLEAR_SELECTION):
        return Object.assign({}, state, {
          selectedId: null,
          selectedRecord: null
        })
      default:
        return state
    }
  }
}
