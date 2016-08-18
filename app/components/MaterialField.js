import React from "react"
import FKSelect from 'components/FKSelect'
import {createFieldClass, controls, utils} from "react-redux-form"
import Toggle from 'material-ui/Toggle'
import Checkbox from 'material-ui/Checkbox'
import TextField from 'material-ui/TextField'
import FileField from 'components/FileField'
import DatePicker from 'material-ui/DatePicker'
import AutoComplete from 'material-ui/AutoComplete'
import SelectField from 'material-ui/SelectField'
import dateformat from 'dateformat'

import {log} from 'utils/Util'


function isChecked(props) {
  if (utils.isMulti(props.model)) {
    return (props.modelValue || [])
      .filter((item) => item === props.value)
      .length
  }

  return !!props.modelValue;
}

const MaterialField = createFieldClass({
  'Connect(FKSelect)': controls.text,
  TextField: controls.text,
  FileField: controls.text,
  AutoComplete: ({onChange, onNewRequest, searchText, ...props}) => ({ // eslint-disable-line
    searchText: (() => {
      const r = props.dataSource.find((e) => e.value === props.modelValue)
      if (!r) return ''
      return r.text
    })(),
    name: props.name || props.model,
    onNewRequest: (sT, idx) => {
      onChange(props.dataSource[idx].value)
    },
    ...props
  }),
  DatePicker: ({onChange, ...props}) => {
    let value = null
    if (props.modelValue && props.modelValue.trim()) {
      const msec = Date.parse(props.modelValue)
      value = new Date(msec)
    }
    return {
      value,
      name: props.name || props.model,
      onChange: (unused, v) => onChange(dateformat(v, 'isoDate')),
      ...props,
    }
  },
  Checkbox: (props) => ({
    name: props.name || props.model,
    checked: props.defaultChecked
      ? props.checked
      : isChecked(props),
    onCheck: () => {
      props.onChange(!props.modelValue)
    },
    ...props,
  }),
  Toggle: (props) => ({
    name: props.name || props.model,
    onToggle: () => {
      props.onChange(!props.modelValue)
    },
    toggled: props.defaultToggled
      ? props.toggled
      : isChecked(props),
    ...props,
  }),
  SelectField: ({onChange, ...props}) => ({
    value: props.modelValue,
    name: props.name || props.model,
    onChange: (event, idx, payload) => onChange(payload),
    ...props,
  })
}, {
  componentMap: {
    TextField,
    Toggle,
    Checkbox,
    FileField,
    DatePicker,
    AutoComplete,
    SelectField,
    'Connect(FKSelect)': FKSelect,
  }
})

export default MaterialField
