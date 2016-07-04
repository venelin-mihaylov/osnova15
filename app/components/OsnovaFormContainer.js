import React from 'react'
import CRUDAct from 'constants/CRUDAct'
import {autobind} from 'core-decorators'
import {rrfModel} from 'utils/Util'
import {resetFormRecord} from 'actions/resetFormRecord'
import {push, goBack} from 'react-router-redux'
import {bindActionCreators} from 'redux'
import {actions} from 'react-redux-form'

export default class OsnovaFormContainer extends React.Component {
  static entity

  constructor() {
    super()
    this.act = CRUDAct.act(this.constructor.entity)
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
      dispatch(this.act(CRUDAct.INIT_FORM, true))
    }
  }

  @autobind
  resetForm() {
    this.props.dispatch(actions.reset(rrfModel(this.constructor.entity)))
  }

  @autobind
  readServerRecord() {
    this.props.dispatch(this.act(CRUDAct.READ_REQUESTED, { id: this.props.params.id}))
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
          record => boundAct(CRUDAct.CREATE_REQUESTED, {record, nextUri: redux.nextUri}) :
          record => boundAct(CRUDAct.UPDATE_REQUESTED, {record, nextUri: redux.nextUri})
      ),
      onReset: () => dispatch(resetFormRecord(entity)),
      onCancel: () => dispatch(redux.nextUri ? push(redux.nextUri) : goBack())
    }
  }


}