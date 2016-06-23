import React from "react"
import {ucfirst} from 'utils/Util'

const EntityAdd = props => {
  const {
    FormComponent,
  } = props

  return (<div>
    <h1>Add {ucfirst(props.entity)}</h1>
    <div><FormComponent {...props}/></div>
  </div>)
}
export default EntityAdd
