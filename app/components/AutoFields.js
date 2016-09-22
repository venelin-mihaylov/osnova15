import React from 'react'
import {toArray, rrfField, truthy} from 'utils/Util'
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
import pickBy from 'lodash/pickBy'

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
    onChange: ({onChange}) => (e, value) => {
      console.log('onChange: ' + value)
      onChange(value)
    },
    error: ({fieldValue: {valid}}) => !valid
  }

  static mapPropsCheckbox = {
    ...controls.checkbox,
    error: ({fieldValue: {valid}}) => !valid
  }

  static mapPropsText = {
    ...controls.text,
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

  static renderInput({
    type,
    format,
    fkProps,
    labelField,
    enumProps
  }) {
    let component = null
    let addComponentProps = null
    let mapProps = AutoFields.mapPropsText
    let updateOn = 'change'

    const t = toArray(type)
    if (t.indexOf('string') !== -1) {
      if (format === 'date') {
        component = DatePicker
        addComponentProps = {
          isClearable: true,
          dateFormat: 'YYYY/MM/DD'
        }
        mapProps = AutoFields.mapPropsDateField
      } else {
        component = Input
        updateOn = 'blur'
      }
    } else if (t.indexOf('integer') !== -1) {
      if (fkProps.entity) { // foreign key
        component = FKSelect
        addComponentProps = {
          entity: fkProps.entity,
          variation: '1',
          labelField
        }
      } else if (enumProps) { // value map
        component = Dropdown
        addComponentProps = {
          selection: true,
          options: AutoFields.enumToOptions(enumProps),
        }
        mapProps = AutoFields.mapPropsDropdown
      } else { // number
        component = Input
        updateOn = 'blur'
      }
    } else if (t.indexOf('number') !== -1) {
      component = Input
    } else if (t.indexOf('boolean') !== -1) {
      component = Checkbox
      mapProps = AutoFields.mapPropsCheckbox
    } else {
      throw new Error('Invalid auto field')
    }

    return {
      component,
      mapProps,
      addComponentProps,
      updateOn
    }
  }

  static validators = {
    required: () => v => !!v,
    minLength: minLength => v => v && v.length >= minLength,
    maxLength: maxLength => v => !v || (v && v.length <= maxLength)
  }

  static fieldValidators(schemaValidations) {
    return mapValues(pickBy(schemaValidations, truthy), (val, key) => AutoFields.validators[key](val))
  }

  static renderField({
    entity,
    namePrefix = '', // prefix, in case of 1:N
    name, // name of the field
    required = false,
    fkProps = {}, // FK table/field, available only for FK
    fieldSchema: {
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
      exclude = false, // exclude field
      rrfProps = {},
      ...restOverrides
    },
    styles = {}, // css styles,
  }) {
    if (noForm) return null
    if (exclude) return null
    if (name === 'id') return null

    if (endsWith(label, 'Id')) {
      label = trimEnd(label, 'Id') // eslint-disable-line
    }

    const {component, mapProps, addComponentProps, updateOn} = this.renderInput({
      type,
      format,
      fkProps,
      labelField,
      enumProps,
    })

    if (component === null) {
      return null
    }

    const fullField = `${namePrefix}${name}`
    const validators = AutoFields.fieldValidators({
      required,
      minLength,
      maxLength
    })

    return React.createElement(Control, {
      key: rrfField(entity, fullField),
      model: rrfField(entity, fullField),
      component: Form.Field,
      controlProps: {
        control: component,
        label,
        ...addComponentProps,
        ...restOverrides,
      },
      validators,
      mapProps,
      updateOn,
      validateOn: 'change',
      ...rrfProps
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
    forOwn(jsonSchema.properties, (fieldSchema, name) => {
      if (fieldSchema.properties) return // embedded object, not supported
      const overrides = allOverrides[name] || {}
      const fkProps = this.fkProps(name, relations)
      const required = jsonSchema.required.indexOf(name) !== -1
      const args = Object.assign({fieldSchema, name, required, overrides, fkProps}, rest)
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
