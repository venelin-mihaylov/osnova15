import React from 'react' // eslint-disable-line
import {createFieldClass, controls} from 'react-redux-form'
import {Input, Dropdown} from 'stardust'
import DatePicker from 'react-datepicker'
import FileField from 'components/FileField'
import moment from 'moment'

const SUIField = createFieldClass({
  'Connect(FKSelect)': controls.text,
  FileField: controls.text,
  Input: controls.text,
  DatePicker: ({onChange, ...props}) => ({
    selected: props.modelValue ? moment(props.modelValue) : null,
    name: props.name || props.model,
    onChange: (v) => onChange(v ? v.format() : null),
    ...props,
  }),
  Dropdown: ({onChange, ...props}) => ({
    name: props.name || props.model,
    value: props.modelValue,
    onChange: (e, value) => onChange(value),
    ...props,
  }),
}, {
  componentMap: {
    Input,
    DatePicker,
    Dropdown,
    FileField,
  }
})

export default SUIField
