import tv4 from 'tv4'
import formats from 'tv4-formats'
import {Model, ValidationError, ModelBase} from 'objection'
import dateformat from 'dateformat'
import {toArray} from './util/util'
const tv4coerce = require('tv4-coerce/main.js')

tv4.addFormat(formats)
tv4coerce.tv4.addFormat(formats)

/**
 * add basic type coercetion
 */
tv4coerce.addFix(tv4coerce.errorCodes.INVALID_TYPE, function (data, type, error, baseSchema) {
  const t = toArray(type)
  if (t.indexOf('null') !== -1 && data === null) {
    return data
  }

  if (t.indexOf('number') !== -1) {
    data = parseFloat(data)
    if (!isNaN(data)) return data
  } else if (t.indexOf('integer') !== -1) {
    data = parseInt(data)
    if (!isNaN(data)) return data
  } else if (t.indexOf('string') !== -1) {
    if (typeof data === 'number') {
      return '' + data
    }
    if (!data) { // for a string, it's ok to return cast null to ''
      return ''
    }
  } else if (t.indexOf('boolean') !== -1) {
    return !!data
  }
})

tv4coerce.addFix(tv4coerce.errorCodes.FORMAT_CUSTOM, function(data, type, error, baseSchema) {
  return dateformat(data, 'isoDate')
})

export default class OsnovaModel extends Model {

  /**
   * Override parent to enhance the ValidationError object with error type
   * @param json
   * @param options
   * @returns {Object}
   */
  $validate(json = this, options = {}) {

    const ModelClass = this.constructor
    let jsonSchema = ModelClass.jsonSchema

    if (!jsonSchema || options.skipValidation) {
      return json
    }

    // No need to call $beforeValidate (and clone the jsonSchema) if $beforeValidate has not been overwritten.
    if (this.$beforeValidate !== ModelBase.prototype.$beforeValidate) {
      jsonSchema = _.cloneDeep(jsonSchema)
      jsonSchema = this.$beforeValidate(jsonSchema, json, options)
    }

    const report = this._tryValidate(jsonSchema, json, options)
    // this.parseValidationError is osnova code
    const validationError = this._parseValidationError(report)

    if (validationError) {
      throw validationError
    }

    this.$afterValidate(json, options)
    return json
  }

  _tryValidate(jsonSchema, json, options) {
    let required

    try {
      if (options.patch) {
        required = jsonSchema.required
        jsonSchema.required = []
      }

      // coerce types
      const result = tv4coerce.coerce(json, jsonSchema)
      return tv4.validateMultiple(result.data, jsonSchema)
    } finally {
      if (options.patch) {
        jsonSchema.required = required
      }
    }
  }

  _parseValidationError(report) {
    const errorHash = {}
    let index = 0

    if (report.errors.length === 0) {
      return null
    }

    for (let i = 0; i < report.errors.length; ++i) {
      const error = report.errors[i]
      let key = error.dataPath.split('/').slice(1).join('.')

      // Hack: The dataPath is empty for failed 'required' validations. We parse
      // the property name from the error message.
      if (!key && error.message.substring(0, 26) === 'Missing required property:') {
        key = error.message.split(':')[1].trim()
      }

      // If the validation failed because of extra properties, the key is an empty string. We
      // still want a unique error in the hash for each failure.
      if (!key) {
        key = (index++).toString()
      }

      errorHash[key] = {
        message: error.message,
        code: error.code
      }
    }

    return new ValidationError(errorHash)
  }
}
