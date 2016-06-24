import React from "react"
import {ucfirst} from 'utils/Util'
import EntityForm from 'components/EntityForm'

const EntityAdd = props => (<div>
    <h1>Add {ucfirst(props.entity)}</h1>
    <div><EntityForm {...props}/></div>
  </div>
);
export default EntityAdd
