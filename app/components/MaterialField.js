"use strict"
import React from "react"
import FKSelect from 'components/FKSelect'
import {createFieldClass, controls, utils} from "react-redux-form"
import Toggle from 'material-ui/Toggle'
import Checkbox from 'material-ui/Checkbox'
import FileField from 'components/FileField'


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
  FileField: controls.text,
  Checkbox: (props) => ({
    name: props.name || props.model,
    checked: props.defaultChecked
      ? props.checked
      : isChecked(props),
    ...props,
    onCheck: () => {
      props.onChange(!props.modelValue)
    },
  }),
  'Toggle': (props) => ({
    name: props.name || props.model,
    onToggle: () => {
      props.onChange(!props.modelValue)
    },
    toggled: props.defaultToggled
      ? props.toggled
      : isChecked(props),
    ...props,
  }),

}, {
  componentMap: {
    'Connect(FKSelect)': FKSelect,
    Toggle: Toggle,
    Checkbox: Checkbox,
    FileField: FileField
  }
})

export default MaterialField
