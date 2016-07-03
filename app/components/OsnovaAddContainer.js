import React from 'react'
import CRUDActionType from 'constants/CRUDActionType'
import {autobind} from 'core-decorators'
import {actions} from 'react-redux-form'
import {formModel} from 'utils/Util'
import {resetFormRecord} from 'actions/resetFormRecord'
import {goBack} from 'react-router-redux'
import {bindActionCreators} from 'redux'


export default class OsnovaAddContainer extends React.Component {
  static entity

  constructor() {
    super()
    this.act = CRUDActionType.act(this.constructor.entity)
  }

  componentWillMount() {
    this.resetForm()
  }

  @autobind
  resetForm() {
    this.props.dispatch(actions.reset(formModel(this.constructor.entity)))
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
      onSubmit: record => boundAct(CRUDActionType.CREATE_REQUESTED, {record}),
      onReset: () => dispatch(resetFormRecord(entity)),
      onCancel: () => dispatch(goBack())
    }
  }


}