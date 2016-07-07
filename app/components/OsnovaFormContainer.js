import React from 'react'
import CRUDAct from 'constants/CRUDAct'
import {autobind} from 'core-decorators'
import {rrfModel} from 'utils/Util'
import {resetFormRecord} from 'actions/resetFormRecord'
import {push, goBack} from 'react-router-redux'
import {bindActionCreators} from 'redux'
import {actions} from 'react-redux-form'

@autobind
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
        resetForm
      },
      route: {
        action
      }
    } = this.props

    if(resetForm) {
      if(action == 'edit') {
        this.readServerRecord()
      }
    } else {
      // by default resetForm=false is a flash,  reset setting
      dispatch(this.act(CRUDAct.RESET_FORM, true))
    }
  }

  componentWillUnmount() {
    if(this.props.redux.resetForm) {
      this.resetForm()
    }
  }

  resetForm() {
    this.props.dispatch(actions.reset(rrfModel(this.constructor.entity)))
  }

  readServerRecord() {
    this.props.dispatch(this.act(CRUDAct.READ_REQUESTED, { id: this.props.params.id}))
  }

  onCreate(record) {
    const {dispatch, redux: {nextUri}} = this.props
    dispatch(this.act(CRUDAct.CREATE_REQUESTED, {record, nextUri}))
  }

  onUpdate(record) {
    const {dispatch, redux: {nextUri}} = this.props
    dispatch(this.act(CRUDAct.UPDATE_REQUESTED, {record, nextUri}))
  }

  addProps() {
    const {
      dispatch,
      redux: {
        nextUri
      },
      route: {
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
      onSubmit: (action == 'add' ? this.onCreate : this.onUpdate),
      onReset: () => dispatch(resetFormRecord(entity)),
      onCancel: () => dispatch(nextUri ? push(nextUri) : goBack())
    }
  }


}