import React from 'react'
import {MUIErrorText, rrfField} from 'utils/Util'
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

  renderField({form, entity, spec, field, namePrefix, namePrefix, relations, options, fieldOptions, styles}) {
    const {
      type,
      label
    } = spec

    const {
      muiProps = {},
      rrfProps = {},
      skip = false,
    } = fieldOptions

    if (skip) {
      return null
    }

    const fullField = `${namePrefix}${field}`

    let input = <div>No Field</div>

    switch (type) {
      case 'string':
        input = <TextField
          {...(Object.assign({
            required: true,
            floatingLabelText: label,
            floatingLabelFixed: true,
            className: styles[field],
            errorText: MUIErrorText(form, entity, fullField)
          }, muiProps))}
        />
        break;
      case 'integer':
      case 'number':
      case 'boolean':
    }

    return <MaterialField {...(Object.assign({
      key: fullField,
      model: rrfField(entity, fullField)
    }, rrfProps))}
    >
      {input}
    </MaterialField>

  }

  render() {
    const {
      form,
      entity,
      namePrefix,
      schema,
      relations,
      fieldOptions,
      options,
      styles
    } = this.props

    let uiFields = []
    _.forOwn(schema.properties, (spec, field) => {
      let f = this.renderField(this.props)
      if (f) uiFields.push(f)
    })

    return <div>{uiFields}</div>
  }
}