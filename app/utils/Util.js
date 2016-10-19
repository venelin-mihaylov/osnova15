import React from 'react'
import {Errors, actions} from 'react-redux-form'
import CRUDAct from 'constants/CRUDAct'
import curry from 'lodash/curry'
import {bindActionCreators} from 'redux'
import get from 'lodash/get'
import moment from 'moment'
import {countries} from 'country-data'
import {Flag} from 'semantic-ui-react'
import isArray from 'lodash/isArray'
import isObject from 'lodash/isObject'
import traverse from 'traverse'
import keys from 'lodash/keys'

export function rrfModel(entity) {
  return `rrf.${entity}`
}

export function toStringField(field) {
  if (!isArray(field)) {
    return field
  }
  if (!field.length) {
    return ''
  }

  return field.reduce((prev, cur) => prev + (parseInt(cur, 10) == cur ? `[${cur}]` : cur))
}

export function rrfField(entity, field) {
  const f = toStringField(field)
  if (f[0] === '[') {
    return rrfModel(entity) + f
  }

  return rrfModel(entity) + '.' + f
}

export const defaultErrorMessages = {
  length: 'Field is too short.',
  required: 'Field is required.'
}

/**
 *
 * @param form
 * @param dbTable string
 * @param fieldName string
 * @param messages object
 * @returns {React.Component|null}
 * @constructor
 */
export function MUIErrorText(form, dbTable, fieldName, messages = defaultErrorMessages) {
  if (!fieldName) {
    return null
  }
  const key = fieldName.replace(/\[|\]\./g, '.')
  const field = form.fields[key]
  if (!field) return null
  if (!field.errors) return null

  const fieldErrors = field.errors
  let error = false
  for (const k in fieldErrors) {
    if (!fieldErrors.hasOwnProperty(k)) continue
    error = error || fieldErrors[k]
  }
  if (!error) {
    return null
  }

  return (<Errors
    model={rrfField(dbTable, fieldName)}
    messages={messages}
  />)
}

export function formatServerError(err) {
  console.log(err)
  if (err.status === 500) {
    return {
      globalError: 'Internal server error'
    }
  } else if (err.status === 404) {
    return {
      globalError: err.data.globalError
    }
  } else if (err.status === 422) { // validation
    return err.data
  }
  return {
    globalError: 'General server error'
  }
}

/**
 *
 * @param {string} string
 * @returns {string}
 */
export function ucfirst(string) {
  if (!string) return ''
  return string.charAt(0).toUpperCase() + string.slice(1)
}

/**
 *
 * @param {string} string
 */
export function camelCaseToUnderscore(string) {
  return string.split(/([A-Z])/).reduce((acc, cur) => acc + (cur.toUpperCase() === cur ? '_' + cur.toLowerCase() : cur), '')
}

export function log(o) {
  console.log(o)
  return o
}

export function toUri(...args) {
  const arr = []
  for (let i = 0; i < args.length; i++) {
    arr.push(args[i])
  }
  return arr.reduce((acc, cur) => acc + (cur ? `/${cur}` : ''), '')
}

export function prefixType(entity, variation, type) {
  const e = entity.toUpperCase()
  const v = variation.toUpperCase()
  return `${e}_${v}_${type}`
}

export function act(entity, variation, actionType, rest = {}) {
  if (Array.isArray(rest)) {
    return Object.assign({
      type: prefixType(entity, variation, actionType),
      value: rest
    })
  } else if (typeof rest === 'object') {
    return Object.assign({
      type: prefixType(entity, variation, actionType)
    }, rest)
  }

  return Object.assign({
    type: prefixType(entity, variation, actionType),
    value: rest
  })
}

export function promiseAct(dispatch, entity, variation, actionType, rest = {}) {
  return new Promise((resolve, reject) => {
    const rest2 = Object.assign({}, rest, {resolve, reject})
    const action = act(entity, variation, actionType, rest2)
    dispatch(action)
  })
}

function doSelectCreatedFK({
  dispatch,
  entity,
  fkParams
}) {
  fkParams.forEach(({
    fkEntity,
    fkVariation = '1',
    fkRecord,
    fkFieldName,
    relationType,
    relationName,
  }) => {
    if (!fkRecord) return

    if (relationType === 'belongsToOne') {
      dispatch(actions.change(rrfField(entity, fkFieldName), fkRecord.id))
      // dispatch(act(fkEntity, fkVariation, FKAct.FK_PRELOAD_RECORD, {
      //   name: fkFieldName,
      //   record: fkRecord
      // }))
    } else if (relationType === 'hasMany') {
      const r = {[fkFieldName]: fkRecord.id}
      dispatch(actions.push(rrfField(entity, relationName), r))
    } else {
      throw new Error(`Bad relation type: ${relationType}`)
    }
    // reset the foreign key entity store state, to clear the created record
    dispatch(act(fkEntity, fkVariation, CRUDAct.RESET))
  })
}

export function selectCreatedFK({
  dispatch,
  entity,
  variation,
  select,
  fkParams

}) {
  if (!select) return
  doSelectCreatedFK({
    dispatch,
    entity,
    fkParams
  })
  dispatch(act(entity, variation, CRUDAct.SELECT_CREATED_FK_RECORD, false))
  dispatch(act(entity, variation, CRUDAct.RESET_FORM, true))
}


export function calcNextPath({
  pathname,
  action,
  id,
  record
}) {
  let matches = null

  if (action === 'create' || action === 'update' || action === 'cancel') {
    if (matches = pathname.match(/(\/match\/\d+\/exercise)\/(\d+)\/(\d+)\/edit$/)) return matches[1] // eslint-disable-line

    if (matches = pathname.match(/(.*)\/add$/)) return matches[1] // eslint-disable-line
    if (matches = pathname.match(/(.*)\/(\d+)\/edit$/)) return matches[1] // eslint-disable-line
    if (matches = pathname.match(/(.*)\/create-competitor$/)) return matches[1] // eslint-disable-line
    if (matches = pathname.match(/(.*)\/create-exercise$/)) return matches[1] // eslint-disable-line
    if (matches = pathname.match(/(.*)\/create-target$/)) return matches[1] // eslint-disable-line
    if (matches = pathname.match(/(.*)\/(.*)\/zones$/)) return matches[1] // eslint-disable-line
  }

  if (action === 'add') {
    return `${pathname}/add`
  }

  if (action === 'edit') {
    if (matches = pathname.match(/^(\/match\/\d+\/exercise)$/)) { // eslint-disable-line
      return matches[1] + toUri(record.id, 'edit')
    }

    return pathname + toUri(id, action)
  }

  throw new Error(`no rule for next path: ${pathname} , action: ${actionn}`)
}


export function mergeDeep(target, source) {
  const output = Object.assign({}, target)
  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach(key => {
      if (isObject(source[key])) {
        if (!(key in target)) {
          Object.assign(output, {[key]: source[key]})
        } else {
          output[key] = mergeDeep(target[key], source[key])
        }
      } else {
        Object.assign(output, {[key]: source[key]})
      }
    })
  }
  return output
}

export function toArray(o) {
  if (!o) return []
  return Array.isArray(o) ? o : [o]
}

export function listStatePath(entity, variation = '1') {
  return `${entity}List${variation}`
}

export function crudStatePath(entity, variation = '1') {
  return `${entity}Crud${variation}`
}

export function mapAct(entity, variation = '1') {
  return (dispatch) => ({
    dispatch,
    act: bindActionCreators(curry(act)(entity, variation), dispatch),
    promiseAct: curry(promiseAct)(dispatch, entity, variation)
  })
}

export function mapActFromProps() {
  return (dispatch, ownProps) => {
    return {
      dispatch,
      act: bindActionCreators(curry(act)(ownProps.entity, ownProps.variation), dispatch),
      promiseAct: curry(promiseAct)(dispatch, ownProps.entity, ownProps.variation)
    }
  }
}

export function fkStatePath(entity, variation) {
  return `${entity}Fk${variation}`
}

export function mapListStateToProps(entity, variation, next = (s) => {}) {
  return state => ({
    entity,
    variation,
    redux: state[listStatePath(entity, variation)],
    ...(next(state))
  })
}

export function mapCrudStateToProps(entity, variation, next = (s) => {}) {
  return state => ({
    entity,
    variation,
    redux: state[crudStatePath(entity, variation)],
    ...(next(state))
  })
}

export function formatEnum(schema) {
  return (v, {property}) => get(schema, ['properties', property, 'enumProps', v])
}

export function formatEnum2(schema, property, value) {
  return get(schema, ['properties', property, 'enumProps', value])
}

export function formatBool(v) {
  return v ? 'Yes' : 'No'
}

export function formatDate(v) {
  if (!v) {
    return null
  }
  return moment(v).format('YYYY MMM DD')
}

export function formatCountry(v) {
  if (!v) {
    return null
  }
  const c = countries[v.toUpperCase()]
  return (<span><Flag name={v} />{c && c.name}</span>)
}

export function truthy(v) {
  return !!v
}

export function rrfFormFieldProperty(name, property) {
  const path = name.replace('rrf.', 'rrf.forms.') + '.' + property
  return path
}

/**
 *
 * @param dispatch
 * @param {string} entity
 * @param {object} record
 * @param {string} action
 */
function rrfAllFields({dispatch, entity, record, action = (f, v) => {}, fieldValue = true}) {
  traverse(record).forEach(function () {
    if (!this.path) return
    dispatch(action(rrfField(entity, this.path), fieldValue))
  })
}

export function rrfSetPristine(params) {
  rrfAllFields({
    ...params,
    action: actions.setPristine
  })
}

export function rrfSetValid(params) {
  rrfAllFields({
    ...params,
    action: actions.setValidity
  })
}

export function rrfSetValid2({
  dispatch,
  entity,
  schema,
  additionalFields = []
}) {
  const props = schema.properties
  keys(props)
    .filter(k => !!props[k].enumProps || props[k].format === 'date')
    .concat(toArray(additionalFields))
    .forEach(k => dispatch(actions.setValidity(rrfField(entity, k), true)))
}


export function rrfSetValidAndPristine(params) {
  rrfAllFields({
    ...params,
    action: actions.setPristine
  })

  rrfAllFields({
    ...params,
    action: actions.setValidity
  })
}

export function countryName(alpha2) {
  const c = alpha2.toUpperCase()
  if (countries[c]) {
    return countries[c].name
  }

  return null
}
