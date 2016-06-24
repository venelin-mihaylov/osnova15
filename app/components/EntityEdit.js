import React from "react"
import {ucfirst} from 'utils/Util'
import EntityForm from 'components/EntityForm'

const EntityEdit = props => (<div>
  <h1>Edit {ucfirst(props.entity)}</h1>
  <div><EntityForm {...props}/></div>
</div>)
export default EntityEdit
