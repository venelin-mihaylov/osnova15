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