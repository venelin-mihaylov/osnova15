import React from 'react'
import {getDisplayName} from 'recompose'
import CRUDActionType from 'constants/CRUDActionType'
import {resetFormRecord} from 'actions/resetFormRecord'
import {goBack} from 'react-router-redux'

export default function EditContainerHOC({
  entity
}) {

  return function EditContainerHOC(Component) {
    return class EditContainerHOC extends React.Component {

      static entity = entity
      static displayName = `EditContainerHOC(${getDisplayName(Component)})`

      constructor() {
        super()
        this.act = CRUDActionType.act(this.constructor.entity)
      }

      componentWillMount() {
        this.props.dispatch(this.act(CRUDActionType.READ_REQUESTED, { id: this.props.params.id}))
      }

      render() {
        const entity = this.constructor.entity
        const act = this.act
        const {
          dispatch,
          onSubmit =record => dispatch(act(CRUDActionType.UPDATE_REQUESTED, {record})),
          onReset = () => dispatch(resetFormRecord(entity)),
          onCancel= () => dispatch(goBack()),
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