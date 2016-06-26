"use strict"
import React from 'react'
import OsnovaTextField from 'components/OsnovaTextField'

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