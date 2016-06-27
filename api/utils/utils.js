import {ValidationError} from 'objection'
/**
 *
 * @param validationErrors
 * @param res
 */
export function renderValidationErrors(validationErrors, res) {
  if(validationErrors) {
    res.status(422).json({
      globalError: 'Invalid parameter',
      fieldErrors: validationErrors
    })
  }
  return !!validationErrors
}

export function renderError(err, req, res, next) {
  if (err instanceof ValidationError) {
    console.log(err)
    res.status(422).json({
      globalError: 'Invalid data',
      fieldErrors: err.data
    })
  } else {
    res.status(500).json(err.message)
  }
}

export function throwOnError(errors = []) {
  if([] === errors) return
  const formatted = errors.reduce((acc, cur) => acc[cur.param] = {
      message: cur.msg,
      value: cur.value
    }, {})
  throw new ValidationError(formatted)
}