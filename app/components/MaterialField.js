"use strict"
import React from "react"
import {createFieldClass, controls} from "react-redux-form"

const MaterialField = createFieldClass({
  'TextField': controls.text,
  'Connect(FKSelect)': controls.text,
  'Connect(MaterialToggle)': controls.checkbox,
  'Connect(MaterialCheckbox)': controls.checkbox
})

export default MaterialField
