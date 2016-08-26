import React from 'react'
import {ucfirst} from 'utils/Util'
import EntityForm from 'components/EntityForm'

const EntityFormWrapper = props => (<div>
  <h1>{ucfirst(props.action)} {ucfirst(props.entity)}</h1>
  <div><EntityForm {...props}/></div>
</div>)
export default EntityFormWrapper
