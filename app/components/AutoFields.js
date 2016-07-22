import React from 'react'
import {MUIErrorText, rrfField} from 'utils/Util'
import MaterialField from 'components/MaterialField'
import TextField from 'material-ui/TextField'
import Checkbox from 'material-ui/Checkbox'
import _ from 'lodash'

/**
 * schemaFields: {
        * name: {
        *   rrfProps
        *   muiProps
        *          *
        *
        * }
        *
        *
        * }
 *
 */
export default class AutoFields extends React.Component {

  static propTypes = {
    form: React.PropTypes.object.isRequired,
    entity: React.PropTypes.string.isRequired,
    namePrefix: React.PropTypes.string,
    fieldName: React.PropTypes.string.isRequired,
    fieldOptions: React.PropTypes.object,
    styles: React.PropTypes.object,
  }

  static defaultProps = {
    fieldOptions: {}
  }

  renderField({
    form,
    entity,
    namePrefix = '',
    name,
    schema: {
      type,
      label = name
    },
    options: {
      input = null,
      inputProps = {},
      rrfProps = {},
      exclude = false
    },
    styles = {}
  }) {
    if (exclude) return null
    if (name == 'id') return null
    if (input) return input

    const fullField = `${namePrefix}${name}`

    let genInput = <div>No Field</div>

    switch (type) {
      case 'string':
        genInput = <TextField
          {...(Object.assign({
            required: true,
            floatingLabelText: label,
            floatingLabelFixed: true,
            className: styles[name],
            errorText: MUIErrorText(form, entity, fullField)
          }, inputProps))}
        />
        break;
      case 'integer':
        genInput = <TextField
          {...(Object.assign({
            floatingLabelText: label,
            floatingLabelFixed: true,
            className: styles[name],
            errorText: MUIErrorText(form, entity, fullField)
          }, inputProps))}
        />
        break
      case 'number':
        genInput = <TextField
          {...(Object.assign({
            floatingLabelText: label,
            floatingLabelFixed: true,
            className: styles[name],
            errorText: MUIErrorText(form, entity, fullField)
          }, inputProps))}
        />
        break
      case 'boolean':
        genInput = <Checkbox {...(Object.assign({
          label,
          labelPosition: 'right',
          className: styles[name],
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

  render() {
    const {
      fieldOptions = {},
      jsonSchema = {},
      ...fieldParams
    } = this.props

    let uiFields = []
    _.forOwn(jsonSchema.properties, (schema, name) => {
      const options = fieldOptions[name] || {}
      const args = Object.assign({schema, name, options}, fieldParams)
      let f = this.renderField(args)
      if (f) uiFields.push(f)
    })

    return <span>{uiFields}</span>
  }
}