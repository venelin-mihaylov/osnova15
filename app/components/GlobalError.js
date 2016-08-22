import React from 'react'
const GlobalError = ({globalError, fieldErrors}) => (
  globalError ? (<div>
    <h2>error: {globalError}</h2>
    {fieldErrors && Object.keys(fieldErrors).map(f => (
      <p>{f}: {fieldErrors[f].message}</p>
    ))}
  </div>) : null
)

GlobalError.propTypes = {
  globalError: React.PropTypes.any,
  fieldErrors: React.PropTypes.any,
}
export default GlobalError

