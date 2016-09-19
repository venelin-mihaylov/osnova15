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
      wrapWithFormField = true,
      input = null, // completely override input component
      inputEl = null, // override input component type
      rrfProps = {}, // add/override react-redux-form component props
      formFieldProps = {}, // add/override Form.Field props
      exclude = false, // exclude field
      ...inputProps
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
    let wrap = true
    const validators = {}
    if (required) {
      validators.required = v => v && v.length
    }
    if (minLength) {
      validators.minLength = v => v && v.length > minLength
    }
    if (maxLength) {
      validators.maxLength = v => v && v.length < maxLength
    }

    let genInput = null
    if (input) {
      genInput = input
    } else if (t.indexOf('string') !== -1) {
      if (format === 'date') {
        genInput = React.createElement(inputEl || DatePicker, {
          isClearable: true,
          dateFormat: 'YYYY/MM/DD',
          ...common,
          ...inputProps,
        })
      } else {
        genInput = React.createElement(inputEl || Input, {
          ...common,
          ...inputProps,
        })
      }
    } else if (t.indexOf('integer') !== -1) {
      if (fkProps.entity) { // foreign key
        genInput = React.createElement(inputEl || FKSelect, {
          entity: fkProps.entity,
          variation: '1',
          labelField,
          ...common,
          ...inputProps
        })
      } else if (enumProps) { // value map
        const options = AutoFields.enumToOptions(enumProps)
        genInput = React.createElement(inputEl || Dropdown, {
          selection: true,
          options,
          ...common,
          ...inputProps
        })
      } else { // number
        genInput = React.createElement(inputEl || Input, {
          ...common,
          ...inputProps,
        })
      }
    } else if (t.indexOf('number') !== -1) {
      genInput = React.createElement(inputEl || Input, {
        ...common,
        ...inputProps,
      })
    } else if (t.indexOf('boolean') !== -1) {
      wrap = false
      genInput = React.createElement(inputEl || Checkbox, {
        label,
        ...common,
        ...inputProps
      })
    } else {
      genInput = <div>No Field</div>
    }

    const suiField = (<SUIField
      model={rrfField(entity, fullField)}
      key={fullField}
      updateOn={updateOn}
      validators={validators}
      {...rrfProps}
    >
      {genInput}
      {append}
    </SUIField>)

    wrap = wrap && wrapWithFormField
    if (!wrap) {
      return suiField
    }

    return (<Form.Field {...formFieldProps}>
      <label>{label}</label>
      {suiField}
    </Form.Field>)
  }

  static renderFields({glue, ...params}) {
    const fields = AutoFields.renderFieldsAsObject(params)
    const ret = []
    forOwn(fields, (v) => ret.push(v))
    return ret
  }

  static renderFieldsAsObject({
    overrides: allOverrides,
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
