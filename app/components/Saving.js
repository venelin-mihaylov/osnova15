import React from 'react'
const Saving = ({saving}) => (saving ? <p>Saving ...</p> : null)
Saving.propTypes = {
  saving: React.PropTypes.bool
}
export default Saving
