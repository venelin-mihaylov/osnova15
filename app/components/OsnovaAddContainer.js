import React from 'react'
import CRUDActionType from 'constants/CRUDActionType'
import {autobind} from 'core-decorators'
import {actions} from 'react-redux-form'
import {formModel} from 'utils/Util'
import {resetFormRecord} from 'actions/resetFormRecord'
import {push, goBack} from 'react-router-redux'
import {bindActionCreators} from 'redux'


export default class OsnovaAddContainer extends React.Component {
  static entity

  constructor() {
    super()
    this.act = CRUDActionType.act(this.constructor.entity)
  }

  componentWillMount() {
    if(this.props.redux.initForm) {
      this.resetForm()
    } else {
      // by default initForm=false is a flash, reset setting
      this.props.dispatch(this.act(CRUDActionType.INIT_FORM, true))
    }
  }

  componentWillUnmount() {
    this.props.dispatch(this.act(CRUDActionType.CLEAN_NEXT_URI))
  }

  @autobind
  resetForm() {
    this.props.dispatch(actions.reset(formModel(this.constructor.entity)))
  }

  addProps() {
    const {
      dispatch,
      redux: {
        nextUri
      }
    } = this.props

    const entity = this.constructor.entity
    const act = this.act
    const boundAct = bindActionCreators(act, dispatch)

    return {
      entity,
      boundAct,
      onSubmit: record => boundAct(CRUDActionType.CREATE_REQUESTED, {record, nextUri}),
      onReset: () => dispatch(resetFormRecord(entity)),
      onCancel: () => dispatch(nextUri ? push(nextUri) : goBack())
    }
  }


}