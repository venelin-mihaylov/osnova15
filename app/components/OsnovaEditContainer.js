import React from 'react'
import CRUDActionType from 'constants/CRUDActionType'
import {autobind} from 'core-decorators'
import {actions} from 'react-redux-form'
import {formModel} from 'utils/Util'
import {resetFormRecord} from 'actions/resetFormRecord'
import {goBack} from 'react-router-redux'
import {bindActionCreators} from 'redux'


export default class OsnovaEditContainer extends React.Component {
  static entity

  constructor() {
    super()
    this.act = CRUDActionType.act(this.constructor.entity)
  }

  componentWillMount() {
    this.readServerRecord()
  }

  @autobind
  readServerRecord() {
    this.props.dispatch(this.act(CRUDActionType.READ_REQUESTED, { id: this.props.params.id}))
  }

  addProps() {
    const {
      dispatch,
    } = this.props

    const entity = this.constructor.entity
    const act = this.act
    const boundAct = bindActionCreators(act, dispatch)

    return {
      entity,
      boundAct,
      onSubmit: record => boundAct(CRUDActionType.UPDATE_REQUESTED, {record}),
      onReset: () => dispatch(resetFormRecord(entity)),
      onCancel: () => dispatch(goBack())
    }
  }


}