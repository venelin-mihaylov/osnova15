"use strict"
import React from 'react'
import OsnovaTextField from 'components/OsnovaTextField'
import MaterialField from 'components/MaterialField'
import FKSelect from 'components/FKSelect'
import {formModelField} from "utils/Util"
import {actions, track} from 'react-redux-form'
import RaisedButton from 'material-ui/RaisedButton'
import _get from 'utils/get'
import TextField from "material-ui/TextField"
import {MUIErrorText} from "utils/Util"

export const CompetitorFormFields = ({
  dispatch,
  form,
  entity,
  model: {
    notes = []
  }
}) => (

  <div>
    <OsnovaTextField
      {...{form, entity}}
      field="firstName"
      required
      hintText="first name"
      floatingLabelText="first name"
    />
    <br/>
    <OsnovaTextField
      {...{form, entity}}
      field="lastName"
      required
      hintText="last name"
      floatingLabelText="last name"
    />
    <br/>
    <OsnovaTextField
      {...{form, entity}}
      field="email"
      required
      hintText="email"
      floatingLabelText="email"
    />
    <br/>

  </div>
)
export default CompetitorFormFields