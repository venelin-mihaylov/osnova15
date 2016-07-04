"use strict"
import React from "react"
import {Errors} from "react-redux-form"
import _get from "lodash.get"

export function formModel(entity) {
  return `${entity}Model`
}
export function formModelField(entity, field) {
  return formModel(entity) + '.' + field
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
    model={formModelField(dbTable, fieldName)}
    messages={messages}
  />
}

export function formatServerError(err) {
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

export function toUri(arr) {
  if(!arr || !arr.length) {
    return '';
  }
  return arr.reduce((acc, cur) => acc + (cur ? '/' + cur : ''), '')
}