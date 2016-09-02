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
import isFunction from 'lodash/isFunction'

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
      type,
      format,
      label = name,
      defaultValue,
      enumProps, // if not true
      labelField = 'id', // FK prop
    },
    options: {
      append = null,
      wrapWithFormField = true,
      input = null, // completely override input component
      inputEl = null, // override input component type
      inputProps = {}, // add/override input component props
      rrfProps = {}, // add/override react-redux-form component props
      formFieldProps = {}, // add/override Form.Field props
      exclude = false // exclude field
    },
    styles = {} // css styles
  }) {
    if (exclude) return null
    if (name === 'id') return null

    if (endsWith(label, 'Id')) {
      label = trimEnd(label, 'Id') // eslint-disable-line
    }

    const fullField = `${namePrefix}${name}`

    const className = styles[name]
    const common = {className}

    const t = toArray(type)
    let wrap = true

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
      {...rrfProps}
    >
      {genInput}
      {append}
    </SUIField>)

    wrap = wrap && wrapWithFormField
    if (!wrap) {
      return suiField
    }

    return React.createElement(Form.Field, {
      label,
      ...formFieldProps
    }, suiField)
  }

  static renderFields({
    overrides,
    jsonSchema,
    relations,
    glue,
    ...rest // the rest is passed to every field
  }) {
    const ret = []
    forOwn(jsonSchema.properties, (schema, name) => {
      if (schema.properties) return // embedded object
      const options = overrides[name] || {}
      const fkProps = this.fkProps(name, relations)
      const required = jsonSchema.required.indexOf(name) !== -1
      const args = Object.assign({schema, name, required, options, fkProps}, rest)
      const f = AutoFields.renderField(args)
      if (f) ret.push(f)
      if (glue) {
        if (isFunction(glue)) {
          ret.push(glue(args))
        } else {
          ret.push(glue)
        }
      }
    })
    return ret
  }

  render() {
    const fields = AutoFields.renderFields(this.props)
    return <span>{fields}</span>
  }
}
