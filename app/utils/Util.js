"use strict"
import React from "react"
import {Errors} from "react-redux-form"
import _get from "lodash.get"
import CRUDAct from 'constants/CRUDAct'
import {push} from 'react-router-redux'
import {actions} from 'react-redux-form'
import FKActionType from 'constants/FKActionType'

export function rrfModel(entity) {
  return `${entity}Model`
}
export function rrfField(entity, field) {
  return rrfModel(entity) + '.' + field
}

export const defaultErrorMessages = {
  length: "Field is too short.",
  required: "Field is required."
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
  const fieldErrors = _get(form, `fields.${fieldName}.errors`)
  if (!fieldErrors) {
    return null
  }
  let error = false
  for (let k in fieldErrors) {
    if(!fieldErrors.hasOwnProperty(k)) continue
    error = error || fieldErrors[k]
  }
  if (!error) {
    return null
  }

  return <Errors
    model={rrfField(dbTable, fieldName)}
    messages={messages}
  />
}

export function formatServerError(err) {
  console.log(err)
  if(err.status == 500) {
    return {
      globalError: 'Internal server error'
    }
  } else if(err.status == 422) { // validation
    return err.data
  } else { // default
    return {
      globalError: 'General server error'
    }
  }
}

/**
 *
 * @param {string} string
 * @returns {string}
 */
export function ucfirst(string) {
  if(!string) return ''
  return string.charAt(0).toUpperCase() + string.slice(1)
}

/**
 *
 * @param {string} string
 */
export function camelCaseToUnderscore(string) {
  return string.split(/([A-Z])/).reduce((acc, cur) => acc + (cur.toUpperCase() == cur ? '_' + cur.toLowerCase() : cur), '')
}

export function log(o) {
  console.log(o)
  return o;
}

export function toUri() {
  let arr = []
  for(let i = 0; i < arguments.length; i++) {
    arr.push(arguments[i])
  }
  return arr.reduce((acc, cur) => acc + (cur ? '/' + cur : ''), '')
}

export function navigateToCreateFKRecordAndScheduleSelect({
  dispatch,
  entity,
  scheduleSelect,
  nextUri,
}) {
  const act = CRUDAct.act(entity)

  // if the user creates a new competitor and returns here, add it to the match competitors *once* (flash)
  dispatch(act(CRUDAct.SELECT_CREATED_FK_RECORD, scheduleSelect))
  // do not reset the form on its next mount, *once*, (flash)
  dispatch(act(CRUDAct.RESET_FORM, false))
  // set the return uri for the next form
  // redirect
  dispatch(push(nextUri))
}

export function doSelectCreatedFK({
  dispatch,
  entity,
  selectCreatedFK,
  ...rest
}) {
  if (!selectCreatedFK) return

  selectCreatedFK.forEach(({
    propFKRecord,
    foreignKey,
    relationType,
    relationOne,
    relationMany,
    fkEntity,
    fkVariation
  }) => {
    const recordFK = rest[propFKRecord]
    if(!recordFK) return

    if(relationType == 'one') {
      dispatch(actions.change(rrfField(entity, foreignKey), recordFK.id))
      dispatch(FKActionType.act(fkEntity, fkVariation)(FKActionType.FK_PRELOAD_RECORD, {value: recordFK}))
    }
    if(relationType == 'many') {
      let r = {}
      r[foreignKey] = recordFK.id
      if(relationOne) r[relationOne] = recordFK
      dispatch(actions.push(rrfField(entity, relationMany), r))
    }
    // reset the foreign key entity store state, to clear the created record
    dispatch(CRUDAct.act(fkEntity)(CRUDAct.RESET))
  })
  dispatch(CRUDAct.act(entity)(CRUDAct.SELECT_CREATED_FK_RECORD, false))
}

export function calcNextPath({
  pathname,
  action,
  id
}) {
  console.log(pathname)
  let matches = null
  if(action == 'create' || action == 'update' || action == 'cancel') {
    if (matches = pathname.match(/(.*)\/add$/)) return matches[1]
    if (matches = pathname.match(/(.*)\/(\d+)\/edit$/)) return matches[1]
    if (matches = pathname.match(/(.*)\/create-competitor/)) return matches[1]
  }

  if(action == 'add') {
    return pathname + '/add'
  }

  if(action == 'edit') {
    return pathname + toUri(id, action)
  }

  console.log('no rule for next path')

  return pathname
}