import React from 'react' // eslint-disable-line
import {createFieldClass, controls} from 'react-redux-form'
import {Input, Dropdown} from 'stardust'
import DatePicker from 'react-datepicker'
import moment from 'moment'

const SUIField = createFieldClass({
  Input: controls.text,
  DatePicker: ({onChange, ...props}) => ({
    selected: props.modelValue ? moment(props.modelValue) : null,
    name: props.name || props.model,
    onChange: (v) => onChange(v ? v.format() : null),
    ...props,
  }),
  Dropdown: controls.select,
}, {
  componentMap: {
    Input,
    DatePicker,
    Dropdown,
  }
})

export default SUIField
