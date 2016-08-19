import React from 'react'
import {toArray, rrfField} from 'utils/Util'
import MaterialField from 'components/MaterialField'
import TextField from 'material-ui/TextField'
import Checkbox from 'material-ui/Checkbox'
import FKSelect from 'components/FKSelect' // eslint-disable-line
import DatePicker from 'material-ui/DatePicker'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
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
  fkProps(fieldName, relations) {
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

  renderField({
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
      input = null, // completely override input component
      inputProps = {}, // add/override input component props
      rrfProps = {}, // add/override react-redux-form component props
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
    const common = {required, className, defaultValue}
    const floatingLabel = {
      floatingLabelText: label,
      floatingLabelFixed: true
    }

    const t = toArray(type)

    let genInput = null
    if (input) {
      genInput = input
    } else if (t.indexOf('string') !== -1) {
      if (format === 'date') {
        genInput = React.createElement(DatePicker, Object.assign({
          container: 'inline',
          autoOk: true
        }, common, floatingLabel, inputProps))
      } else {
        genInput = React.createElement(TextField, Object.assign({}, common, floatingLabel, inputProps))
      }
    } else if (t.indexOf('integer') !== -1) {
      if (fkProps.entity) {
        genInput = React.createElement(FKSelect, Object.assign({
          entity: fkProps.entity,
          variation: '1', // by default variation is "1"
          labelField
        }, common, floatingLabel, inputProps))
      } else if (enumProps) {
        const arr = isArray(enumProps) ?
          enumProps :
          Object.keys(enumProps).map(value => ({value: parseInt(value, 10), label: enumProps[value]}))

        const nullValue = React.createElement(MenuItem, {
          key: 'nullValue',
          value: null,
          primaryText: ' '
        })
        genInput = React.createElement(SelectField,
          Object.assign({}, common, floatingLabel, inputProps),
          [nullValue].concat(arr.map(({value, l}) => React.createElement(MenuItem, {
            key: value + l,
            value,
            primaryText: l
          }))))
      } else {
        genInput = React.createElement(TextField, Object.assign({}, common, floatingLabel, inputProps))
      }
    } else if (t.indexOf('number') !== -1) {
      genInput = React.createElement(TextField, Object.assign({}, common, floatingLabel, inputProps))
    } else if (t.indexOf('boolean') !== -1) {
      genInput = React.createElement(Checkbox, Object.assign({
        label,
        labelPosition: 'right',
      }, common, inputProps))
    } else {
      genInput = <div>No Field</div>
    }

    return React.createElement(MaterialField, Object.assign({
      updateOn,
      key: fullField,
      model: rrfField(entity, fullField)
    }, rrfProps), genInput)
  }

  render() {
    const {
      overrides,
      jsonSchema,
      relations,
      glue,
      ...rest // the rest is passed to every field
    } = this.props

    let ret = []
    forOwn(jsonSchema.properties, (schema, name) => {
      if (schema.properties) return
      const options = overrides[name] || {}
      const fkProps = this.fkProps(name, relations)
      const required = jsonSchema.required.indexOf(name) !== -1
      const args = Object.assign({schema, name, required, options, fkProps}, rest)
      const f = this.renderField(args)
      if (f) ret.push(f)
      if (glue) {
        if (isFunction(glue)) {
          ret.push(glue(args))
        } else {
          ret.push(glue)
        }
      }
    })

    return <span>{ret}</span>
  }
}
