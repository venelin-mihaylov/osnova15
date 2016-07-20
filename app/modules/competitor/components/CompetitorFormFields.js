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
      floatingLabelText="first name"
    />
    <br/>
    <OsnovaTextField
      {...{form, entity}}
      field="lastName"
      required
      floatingLabelText="last name"
    />
    <br/>
    <OsnovaTextField
      {...{form, entity}}
      field="email"
      required
      floatingLabelText="email"
    />
    <br/>

  </div>
)
export default CompetitorFormFields