import React from 'react'
import {MUIErrorText, rrfField} from 'utils/Util'
import MaterialField from 'components/MaterialField'
import TextField from 'material-ui/TextField'
import Checkbox from 'material-ui/Checkbox'
import FKSelect from 'components/FKSelect'
import DatePicker from 'material-ui/DatePicker'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import _ from 'lodash/'

export default class AutoFields extends React.Component {

  static propTypes = {
    form: React.PropTypes.object.isRequired,
    entity: React.PropTypes.string.isRequired,
    jsonSchema: React.PropTypes.object.isRequired,
    glue: React.PropTypes.oneOf(
      React.PropTypes.object,
      React.PropTypes.func
    ),
    namePrefix: React.PropTypes.string,
    overrides: React.PropTypes.object,
    relations: React.PropTypes.object,
    styles: React.PropTypes.object,
  }

  static defaultProps = {
    overrides: {},
    relations: {},
    glue: null
  }

  renderField({
    form, // rrf form object
    entity,
    namePrefix = '', // prefix, in case of 1:N
    name, // name of the field
    required = false,
    fkProps = {}, // FK table/field, available only for FK
    schema: {
      type,
      format,
      subtype,
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
    if(exclude) return null
    if(name == 'id') return null

    if(_.endsWith(label, 'Id')) {
      label = _.trimEnd(label, 'Id')
    }

    const fullField = `${namePrefix}${name}`

    const errorText = MUIErrorText(form, entity, fullField)
    const className = styles[name]
    const common = {required, className, errorText, defaultValue}
    const commonLabel = {
      floatingLabelText: label,
      floatingLabelFixed: true
    }

    let genInput = null
    if(input) {
      genInput = input
    } else {
      switch(type) {
        case 'string':
          if(subtype == 'date') {
            genInput = React.createElement(DatePicker, Object.assign({
              container: 'inline',
              autoOk: true
            }, common, commonLabel, inputProps))
          } else {
            genInput = React.createElement(TextField, Object.assign({}, common, commonLabel, inputProps))
          }
          break
        case 'integer':
          if(fkProps.entity) {
            genInput = React.createElement(FKSelect, Object.assign({
              entity: fkProps.entity,
              variation: "1", // by default variation is "1"
              labelField: labelField,
            }, common, commonLabel, inputProps))
          } else if(enumProps) {
            let arr = _.isArray(enumProps) ?
              enumProps :
              Object.keys(enumProps).map(value => ({value: parseInt(value), label: enumProps[value]}))

            genInput = React.createElement(SelectField,
              Object.assign({}, common, commonLabel, inputProps),
              arr.map(({value, label}) => React.createElement(MenuItem, {
                key: value + label,
                value,
                primaryText: label
              })))
          } else {
            genInput = React.createElement(TextField, Object.assign({}, common, commonLabel, inputProps))
          }
          break
        case 'number':
          genInput = React.createElement(TextField, Object.assign({}, common, commonLabel, inputProps))
          break
        case 'boolean':
          genInput = React.createElement(Checkbox, Object.assign({
            label,
            labelPosition: 'right',
          }, common, inputProps))
          break
        default:
          genInput = <div>No Field</div>
      }
    }

    return React.createElement(MaterialField, Object.assign({
      key: fullField,
      model: rrfField(entity, fullField)
    }, rrfProps), genInput)
  }

  /**
   * if the field is a foreign key,
   * we have to render a FKSelect
   * @param fieldName
   * @param relations
   */
  fkProps(fieldName, relations) {
    let ret = {}
    _.forOwn(relations, (relSpec) => {
      if(relSpec.relation == 'BelongsToOne' && relSpec.join.fromField == fieldName) {
        ret = {
          entity: relSpec.join.toTable,
          field: relSpec.join.toField
        }
        return false
      }
    })
    return ret
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
    _.forOwn(jsonSchema.properties, (schema, name) => {
      if(schema.properties) return
      const options = overrides[name] || {}
      const fkProps = this.fkProps(name, relations)
      const required = -1 != jsonSchema.required.indexOf(name)
      const args = Object.assign({schema, name, required, options, fkProps}, rest)
      let f = this.renderField(args)
      if(f) ret.push(f)
      if(glue) {
        _.isFunction(glue) ? ret.push(glue(args)) : ret.push(glue)
      }
    })

    return <span>{ret}</span>
  }
}