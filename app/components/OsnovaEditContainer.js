import React from 'react'
import CRUDActionType from 'constants/CRUDActionType'
import {autobind} from 'core-decorators'
import {resetFormRecord} from 'actions/resetFormRecord'
import {push, goBack} from 'react-router-redux'
import {bindActionCreators} from 'redux'



export default class OsnovaEditContainer extends React.Component {
  static entity

  constructor() {
    super()
    this.act = CRUDActionType.act(this.constructor.entity)
  }

  componentWillMount() {
    if(this.props.redux.initForm) {
      this.readServerRecord()
    } else {
      // by default initForm=false is a flash,  reset setting
      this.props.dispatch(this.act(CRUDActionType.INIT_FORM, true))
    }
  }

  @autobind
  readServerRecord() {
    this.props.dispatch(this.act(CRUDActionType.READ_REQUESTED, { id: this.props.params.id}))
  }

  addProps() {
    const {
      dispatch,
      redux
    } = this.props

    const entity = this.constructor.entity
    const act = this.act
    const boundAct = bindActionCreators(act, dispatch)

    return {
      entity,
      boundAct,
      onSubmit: record => boundAct(CRUDActionType.UPDATE_REQUESTED, {record}),
      onReset: () => dispatch(resetFormRecord(entity)),
      onCancel: () => dispatch(redux.nextUri ? push(redux.nextUri) : goBack())
    }
  }


}