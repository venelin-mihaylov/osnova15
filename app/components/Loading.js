import React from 'react'
const Loading = ({loading}) => (loading ? <p>Loading ...</p> : null)
Loading.propTypes = {
  loading: React.PropTypes.bool
}
export default Loading
