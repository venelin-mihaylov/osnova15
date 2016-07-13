import {Model} from "objection"
import tv4 from 'tv4'
import {ValidationError, ModelBase} from 'objection'

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

    let report = this._tryValidate(jsonSchema, json, options)
    // this.parseValidationError is osnova code
    let validationError = this._parseValidationError(report)

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

      return tv4.validateMultiple(json, jsonSchema)
    } finally {
      if (options.patch) {
        jsonSchema.required = required
      }
    }
  }

  _parseValidationError(report) {
    let errorHash = {}
    let index = 0

    console.log(report)

    if (report.errors.length === 0) {
      return null
    }

    for (let i = 0; i < report.errors.length; ++i) {
      let error = report.errors[i]
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