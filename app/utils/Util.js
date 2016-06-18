"use strict";
import React from "react";
import {Errors} from "react-redux-form";
import _get from "lodash.get";

export function formModel(entity) {
  return `${entity}Model`;
}
export function formModelField(entity, field) {
  return formModel(entity) + '.' + field;
}

export const defaultErrorMessages = {
  length: "Field is too short.",
  required: "Field is required."
};

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
  const fieldErrors = _get(form, `fields.${fieldName}.errors`);
  if (!fieldErrors) {
    return null;
  }
  var error = false;
  for (var k in fieldErrors) {
    error = error || fieldErrors[k];
  }
  if (!error) {
    return null;
  }

  return <Errors
    model={formModelField(dbTable, fieldName)}
    messages={messages}
  />
}
