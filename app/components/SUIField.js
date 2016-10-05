import React from 'react' // eslint-disable-line
import {createFieldClass, controls} from 'react-redux-form'
import {Input, Dropdown, Checkbox} from 'semantic-ui-react'
import OsnovaDropdown from 'components/OsnovaDropdown'
import DatePicker from 'react-datepicker'
import FileField from 'components/FileField'
import CountrySelect from 'components/CountrySelect'
import moment from 'moment'

const SUIField = createFieldClass({
  'Connect(FKSelect)': controls.text,
  FileField: controls.text,
  Input: controls.text,
  DatePicker: ({onChange, ...props}) => ({
    selected: props.viewValue ? moment(props.viewValue) : null,
    name: props.name || props.model,
    onChange: (v) => onChange(v ? v.format() : null),
    ...props,
  }),
  Dropdown: ({onChange, ...props}) => ({
    name: props.name || props.model,
    value: props.viewValue,
    onChange: (e, value) => onChange(value),
    ...props,
  }),
  CountrySelect: ({onChange, ...props}) => ({
    name: props.name || props.model,
    value: props.viewValue,
    onChange: (e, value) => onChange(value),
    ...props,
  }),
  OsnovaDropdown: ({onChange, ...props}) => ({
    name: props.name || props.model,
    value: props.viewValue,
    onChange: (e, value) => onChange(value),
    ...props,
  }),
  Checkbox: controls.checkbox
}, {
  componentMap: {
    Input,
    DatePicker,
    Dropdown,
    OsnovaDropdown,
    FileField,
    Checkbox,
    CountrySelect
  }
})

export default SUIField
