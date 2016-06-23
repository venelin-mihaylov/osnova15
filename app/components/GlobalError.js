import React from 'react'
const GlobalError = ({globalError})=> globalError ? <p>error: {globalError}</p> : null
export default GlobalError