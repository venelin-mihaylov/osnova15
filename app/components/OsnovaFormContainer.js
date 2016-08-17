import React from 'react'
import CRUDAct from 'constants/CRUDAct'
import {autobind} from 'core-decorators'
import {resetFormRecord} from 'actions/resetFormRecord'
import {push} from 'react-router-redux'
import {actions} from 'react-redux-form'
import {rrfModel, calcNextPath} from 'utils/Util'

@autobind
export default class OsnovaFormContainer extends React.Component {
  static entity

  static propTypes = {
    dispatch: React.PropTypes.func,
    redux: React.PropTypes.any,
    route: React.PropTypes.any,
    location: React.PropTypes.any,
    params: React.PropTypes.any,
  }

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

    if (resetForm) {
      this.resetForm()

      if (action === 'edit') {
        this.readServerRecord()
      }
    } else {
      // by default resetForm=false is a flash,  reset setting
      dispatch(this.act(CRUDAct.RESET_FORM, true))
    }
  }

  onCreate(record) {
    const {dispatch} = this.props
    const nextPath = this.nextPath({action: 'create'})
    dispatch(this.act(CRUDAct.CREATE_REQUESTED, {record, nextPath}))
  }

  onUpdate(record) {
    const {dispatch} = this.props
    const nextPath = this.nextPath({action: 'update'})
    dispatch(this.act(CRUDAct.UPDATE_REQUESTED, {record, nextPath}))
  }

  onCancel() {
    const {dispatch} = this.props
    const nextPath = this.nextPath({action: 'cancel'})
    this.resetForm()
    dispatch(push(nextPath))
  }

  nextPath({action, id}) {
    const {location: {pathname}} = this.props
    return calcNextPath({pathname, action, id})
  }

  resetForm() {
    this.props.dispatch(actions.reset(rrfModel(this.constructor.entity)))
  }

  readServerRecord() {
    this.props.dispatch(this.act(CRUDAct.READ_REQUESTED, {id: this.props.params.id}))
  }

  addProps() {
    const {
      dispatch,
      route: {
        action
      }
    } = this.props

    const entity = this.constructor.entity
    const act = this.act
    const promiseAct = CRUDAct.promiseAct(dispatch, this.constructor.entity)

    return {
      entity,
      action,
      act,
      promiseAct,
      onSubmit: (action === 'add' ? this.onCreate : this.onUpdate),
      onReset: () => dispatch(resetFormRecord(entity)),
      onCancel: this.onCancel
    }
  }


}