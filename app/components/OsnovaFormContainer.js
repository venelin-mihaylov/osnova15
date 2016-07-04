import React from 'react'
import CRUDActionType from 'constants/CRUDActionType'
import {autobind} from 'core-decorators'
import {formModel} from 'utils/Util'
import {resetFormRecord} from 'actions/resetFormRecord'
import {push, goBack} from 'react-router-redux'
import {bindActionCreators} from 'redux'
import {actions} from 'react-redux-form'

export default class OsnovaFormContainer extends React.Component {
  static entity

  constructor() {
    super()
    this.act = CRUDActionType.act(this.constructor.entity)
  }

  componentWillMount() {
    const {
      dispatch,
      redux: {
        initForm
      },
      params: {
        action
      }
    } = this.props

    if(initForm) {
      if(action == 'add') {
        this.resetForm()
      } else {
        this.readServerRecord()
      }
    } else {
      // by default initForm=false is a flash,  reset setting
      dispatch(this.act(CRUDActionType.INIT_FORM, {value: true}))
    }
  }

  @autobind
  resetForm() {
    this.props.dispatch(actions.reset(formModel(this.constructor.entity)))
  }

  @autobind
  readServerRecord() {
    this.props.dispatch(this.act(CRUDActionType.READ_REQUESTED, { id: this.props.params.id}))
  }

  addProps() {
    const {
      dispatch,
      redux,
      params: {
        action
      }
    } = this.props

    const entity = this.constructor.entity
    const act = this.act
    const boundAct = bindActionCreators(act, dispatch)

    return {
      entity,
      boundAct,
      action,
      onSubmit: (action == 'add' ?
          record => boundAct(CRUDActionType.CREATE_REQUESTED, {record}) :
          record => boundAct(CRUDActionType.UPDATE_REQUESTED, {record})
      ),
      onReset: () => dispatch(resetFormRecord(entity)),
      onCancel: () => dispatch(redux.nextUri ? push(redux.nextUri) : goBack())
    }
  }


}