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
    res.status(422).json({
      globalError: 'Invalid data',
      fieldErrors: err.data
    })
  } else {
    console.log(err)
    res.status(500).json(err.message)
  }
}

export function throwOnError(errors = []) {
  if(false === errors) return

  const formatted = errors.reduce((acc, cur) => acc[cur.param] = {
      message: cur.msg,
      value: cur.value
    }, {})
  throw new ValidationError(formatted)
}

export function logSql(fn) {
  return function(...args) {
    const ret = fn.call(this, ...args)
    if(ret && typeof ret.toSql == 'function') {
      console.log(ret.toSql())
    }
    return ret
  }
}

export function toArray(o) {
  if(!o) return []
  return Array.isArray(o) ? o : [o]
}

export function toJSON(o) {
  return typeof o === 'string' ? JSON.parse(o) : o
}

export function isObject(item) {
  return (item && typeof item === 'object' && !Array.isArray(item) && item !== null);
}

export function isRowEqual(dbRow, inRow) {
  for(let f in inRow) {
    if(!inRow.hasOwnProperty(f)) continue

    if(inRow[f] != dbRow[f]) {
      return false
    }
  }
  return true
}