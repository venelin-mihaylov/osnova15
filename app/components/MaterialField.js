"use strict"
import React from "react"
import MaterialToggle from 'components/MaterialToggle'
import MaterialCheckbox from 'components/MaterialCheckbox'
import FKSelect from 'components/FKSelect'
import {createFieldClass, controls, utils} from "react-redux-form"
import Toggle from 'material-ui/Toggle'


function isChecked(props) {
  if (utils.isMulti(props.model)) {
    return (props.modelValue || [])
      .filter((item) =>
      item === props.value)
      .length;
  }

  return !!props.modelValue;
}

const MaterialField = createFieldClass({
  'TextField': controls.text,
  'Connect(FKSelect)': controls.text,
  'Connect(MaterialCheckbox)': controls.checkbox,
  'Toggle': (props) => ({
    name: props.name || props.model,
    onToggle: () => {
      props.onChange(!props.modelValue)
    },
    toggled: props.defaultToggled
      ? props.toggled
      : isChecked(props),
    ...props,
  })
}, {
  componentMap: {
    'Connect(FKSelect)': FKSelect,
    'Connect(MaterialCheckbox)': MaterialCheckbox,
    MaterialToggle: MaterialToggle,
    Toggle: Toggle
  }
})

export default MaterialField
