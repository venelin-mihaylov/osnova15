import React from 'react'
import {toArray, rrfField} from 'utils/Util'
import SUIField from 'components/SUIField'
import {Form, Input, Dropdown, Checkbox} from 'stardust'

import DatePicker from 'react-datepicker'
import FKSelect from 'components/FKSelect' // eslint-disable-line
import forOwn from 'lodash/forOwn'
import trimEnd from 'lodash/trimEnd'
import endsWith from 'lodash/endsWith'
import isArray from 'lodash/isArray'
import mapValues from 'lodash/mapValues'
import {Control, controls} from 'react-redux-form'
import moment from 'moment'

export default class AutoFields extends React.Component {

  static propTypes = {
    entity: React.PropTypes.string.isRequired,
    jsonSchema: React.PropTypes.object.isRequired,
    glue: React.PropTypes.oneOfType([
      React.PropTypes.object,
      React.PropTypes.func
    ]),
    namePrefix: React.PropTypes.string,
    overrides: React.PropTypes.object,
    relations: React.PropTypes.object,
    styles: React.PropTypes.object,
  }

  static defaultProps = {
    overrides: {},
    relations: {},
    updateOn: 'change',
    glue: null
  }

  static mapPropsDateField = {
    ...controls.text,
    selected: ({modelValue}) => (modelValue ? moment(modelValue) : null),
    onChange: ({onChange}) => (v) => onChange(v ? v.format() : null),
    error: ({fieldValue: {valid}}) => !valid
  }

  static mapPropsDropdown = {
    ...controls.select,
    onChange: ({onChange}) => (e, value) => onChange(value),
    error: ({fieldValue: {valid}}) => !valid
  }

  /**
   * if the field is a foreign key,
   * we have to render a FKSelect
   * @param fieldName
   * @param relations
   */
  static fkProps(fieldName, relations) {
    let ret = {}
    forOwn(relations, (relSpec) => {
      if (relSpec.relation === 'BelongsToOne' && relSpec.join.fromField === fieldName) {
        ret = {
          entity: relSpec.join.toTable,
          field: relSpec.join.toField
        }
        return false
      }
      return true
    })
    return ret
  }

  static enumToOptions(enumProps) {
    const options = isArray(enumProps) ?
      enumProps :
      Object.keys(enumProps).map(value => ({value: parseInt(value, 10), text: enumProps[value]}))

    options.unshift({
      value: null,
      text: ''
    })

    return options
  }

  static renderField({
    updateOn,
    entity,
    namePrefix = '', // prefix, in case of 1:N
    name, // name of the field
    required = false,
    fkProps = {}, // FK table/field, available only for FK
    schema: {
      noForm, // don't show
      type,
      format,
      label = name,
      defaultValue,
      minLength,
      maxLength,
      enumProps, // if not true
      labelField = 'id', // FK prop
    },
    overrides: {
      append = null,
      exclude = false, // exclude field
      controlProps = {},
      ...rest
    },
    styles = {}, // css styles,
  }) {
    if (noForm) return null
    if (exclude) return null
    if (name === 'id') return null

    if (endsWith(label, 'Id')) {
      label = trimEnd(label, 'Id') // eslint-disable-line
    }

    const fullField = `${namePrefix}${name}`

    // const className = styles[name]
    const common = {
      className: 'error'
    }

    const t = toArray(type)
    const validators = {}
    if (required) {
      validators.required = v => v && v.length
    }
    if (minLength) {
      validators.minLength = v => v && v.length > minLength
    }
    if (maxLength) {
      validators.maxLength = v => !v || (v && v.length < maxLength)
    }

    let addInputProps = null
    let mapProps = controls.text // default
    let component = null
    if (t.indexOf('string') !== -1) {
      if (format === 'date') {
        component = DatePicker
        addInputProps = {
          isClearable: true,
          dateFormat: 'YYYY/MM/DD'
        }
        mapProps = AutoFields.mapPropsDateField
      } else {
        component = Input
      }
    } else if (t.indexOf('integer') !== -1) {
      if (fkProps.entity) { // foreign key
        component = FKSelect
        addInputProps = {
          entity: fkProps.entity,
          variation: '1',
          labelField
        }
      } else if (enumProps) { // value map
        component = Dropdown
        addInputProps = {
          selection: true,
          options: AutoFields.enumToOptions(enumProps),
        }
        mapProps = AutoFields.mapPropsDropdown
      } else { // number
        component = Input
      }
    } else if (t.indexOf('number') !== -1) {
      component = Input
    } else if (t.indexOf('boolean') !== -1) {
      component = Checkbox
      mapProps = controls.checkbox
    } else {
      throw new Error('Invalid auto field')
    }

    return React.createElement(Control, {
      key: rrfField(entity, fullField),
      model: rrfField(entity, fullField),
      component: Form.Field,
      controlProps: {
        control: component,
        label,
        ...addInputProps,
        ...rest,
      },
      validators,
      mapProps: {
        ...mapProps,
        error: ({fieldValue: {valid}}) => !valid
      },
      ...controlProps
    })
  }

  static renderFields({glue, ...params}) {
    const fields = AutoFields.renderFieldsAsObject(params)
    const ret = []
    forOwn(fields, (v) => ret.push(v))
    return ret
  }

  static renderFieldsAsObject({
    overrides: allOverrides = {},
    jsonSchema,
    relations,
    ...rest // the rest is passed to every field
  }) {
    const ret = {}
    forOwn(jsonSchema.properties, (schema, name) => {
      if (schema.properties) return // embedded object
      const overrides = allOverrides[name] || {}
      const fkProps = this.fkProps(name, relations)
      const required = jsonSchema.required.indexOf(name) !== -1
      const args = Object.assign({schema, name, required, overrides, fkProps}, rest)
      const f = AutoFields.renderField(args)
      if (f) {
        ret[name] = f
      }
    })
    return ret
  }

  render() {
    const fields = AutoFields.renderFields(this.props)
    return <span>{fields}</span>
  }
}
