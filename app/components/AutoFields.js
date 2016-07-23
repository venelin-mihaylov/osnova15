import React from 'react'
import {MUIErrorText, rrfField} from 'utils/Util'
import MaterialField from 'components/MaterialField'
import TextField from 'material-ui/TextField'
import Checkbox from 'material-ui/Checkbox'
import FKSelect from 'components/FKSelect'
import _ from 'lodash'

export default class AutoFields extends React.Component {

  static propTypes = {
    form: React.PropTypes.object.isRequired,
    entity: React.PropTypes.string.isRequired,
    namePrefix: React.PropTypes.string,
    overrides: React.PropTypes.object,
    relations: React.PropTypes.object,
    styles: React.PropTypes.object,
  }

  static defaultProps = {
    overrides: {},
    relations: {},
  }

  renderField({
    form, // rrf form object
    entity,
    namePrefix = '', // prefix, in case of 1:N
    name, // name of the field
    required = false,
    fkProps = {}, // FK props, available only for FK
    schema: {
      type,
      label = name,
      labelField = 'id', // FK prop
    },
    options: {
      input = null, // add/override input component
      inputProps = {}, // add/override input props
      rrfProps = {}, // add/override react-redux-form component props
      exclude = false // exclude field
    },
    styles = {} // css styles
  }) {
    if (exclude) return null
    if (name == 'id') return null
    if (input) return input

    if(_.endsWith(label, 'Id')) {
      label = _.trimEnd(label, 'Id')
    }

    const fullField = `${namePrefix}${name}`

    let genInput = <div>No Field</div>

    switch (type) {
      case 'string':
        genInput = <TextField
          {...(Object.assign({
            floatingLabelText: label,
            floatingLabelFixed: true,
            className: styles[name],
            required,
            errorText: MUIErrorText(form, entity, fullField)
          }, inputProps))}
        />
        break;
      case 'integer':
        if(fkProps.entity) {
          genInput = <FKSelect
            {...(Object.assign({
              entity: fkProps.entity,
              variation: "1", // by default variation is "1"
              floatingLabelText: label,
              floatingLabelFixed: true,
              labelField: labelField,
              className: styles[name],
              required,
              errorText: MUIErrorText(form, entity, fullField)
            }, inputProps))}
          />
        } else {
          genInput = <TextField
            {...(Object.assign({
              floatingLabelText: label,
              floatingLabelFixed: true,
              className: styles[name],
              required,
              errorText: MUIErrorText(form, entity, fullField)
            }, inputProps))}
          />
        }
        break
      case 'number':
        genInput = <TextField
          {...(Object.assign({
            floatingLabelText: label,
            floatingLabelFixed: true,
            className: styles[name],
            required,
            errorText: MUIErrorText(form, entity, fullField)
          }, inputProps))}
        />
        break
      case 'boolean':
        genInput = <Checkbox {...(Object.assign({
          label,
          labelPosition: 'right',
          className: styles[name],
          required,
          errorText: MUIErrorText(form, entity, fullField)
        }, inputProps))}
        />
        break
    }

    return <MaterialField {...(Object.assign({
      key: fullField,
      model: rrfField(entity, fullField)
    }, rrfProps))}
    >
      {genInput}
    </MaterialField>

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
        // this is a foreign key to modelClass model, toField
        ret = {
          entity: relSpec.join.toTable,
          field: relSpec.join.toField
        }
        return false
      } else {
        return true
      }
    })
    return ret
  }

  render() {
    const {
      overrides,
      jsonSchema,
      relations,
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
      if (f) ret.push(f)
    })

    return <span>{ret}</span>
  }
}