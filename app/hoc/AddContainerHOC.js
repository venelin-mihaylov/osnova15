import React from 'react'
import {getDisplayName} from 'recompose'
import CRUDActionType from 'constants/CRUDActionType'
import {formModel} from "utils/Util"
import {actions} from "react-redux-form"
import {resetFormRecord} from 'actions/resetFormRecord'
import {goBack} from 'react-router-redux'

export default function AddContainerHOC({
  entity,
  postSaveUri
}) {

  return function AddContainerHOC(Component) {
    return class AddContainerHOC extends React.Component {

      static entity = entity
      static displayName = `AddContainerHOC(${getDisplayName(Component)})`

      componentWillMount() {
        this.props.dispatch(actions.reset(formModel(this.constructor.entity)))
      }

      render() {
        const entity = this.constructor.entity
        const act = CRUDActionType.act(entity)
        const {
          dispatch,
          onSubmit = record => dispatch(act(CRUDActionType.CREATE_REQUESTED, {record})),
          onReset = () => dispatch(resetFormRecord(entity)),
          onCancel = () => dispatch(goBack()),
          ...rest
        } = this.props

        return <Component
          {...{
            entity,
            act,
            dispatch,
            onSubmit,
            onReset,
            onCancel
          }}
          {...rest}
        />
      }
    }
  }
}