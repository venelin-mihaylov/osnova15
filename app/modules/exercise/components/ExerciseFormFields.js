"use strict"
import React from 'react'
import OsnovaTextField from 'components/OsnovaTextField'

export const ExerciseFormFields = ({
  dispatch,
  form,
  entity
}) => (

  <div>
    <OsnovaTextField
      {...{form, entity}}
      field="name"
      required
      hintText="name"
      floatingLabelText="name"
    />
  </div>
)
export default ExerciseFormFields