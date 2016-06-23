import React from "react"
import {ucfirst} from 'utils/Util'

const EntityEdit = props => {
  const {
    FormComponent,
  } = props

  return (<div>
    <h1>Edit {ucfirst(props.entity)}</h1>
    <div><FormComponent {...props}/></div>
  </div>)
}
export default EntityEdit
