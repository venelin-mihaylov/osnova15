import React from 'react'
import CRUDAct from 'constants/CRUDAct'
import {autobind} from 'core-decorators'
import {resetFormRecord} from 'actions/resetFormRecord'
import {push} from 'react-router-redux'
import {actions} from 'react-redux-form'
import {rrfModel, calcNextPath} from 'utils/Util'

@autobind
export default class OsnovaFormContainer extends React.Component {

  static propTypes = {
    entity: React.PropTypes.string,
    variation: React.PropTypes.string,
    dispatch: React.PropTypes.func,
    redux: React.PropTypes.any,
    route: React.PropTypes.any,
    location: React.PropTypes.any,
    params: React.PropTypes.any,
    act: React.PropTypes.func,
    promiseAct: React.PropTypes.func,
  }

  componentWillMount() {
    const {
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
      this.props.act(CRUDAct.RESET_FORM, true)
    }
  }

  onCreate(record) {
    const nextPath = this.nextPath({action: 'create'})
    this.props.act(CRUDAct.CREATE_REQUESTED, {record, nextPath})
  }

  onUpdate(record) {
    const nextPath = this.nextPath({action: 'update'})
    this.props.act(CRUDAct.UPDATE_REQUESTED, {record, nextPath})
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
    this.props.dispatch(actions.reset(rrfModel(this.props.entity)))
  }

  readServerRecord() {
    this.props.act(CRUDAct.READ_REQUESTED, {id: this.props.params.id})
  }

  addProps() {
    const {
      entity,
      dispatch,
      route: {
        action
      }
    } = this.props

    return {
      action,
      onSubmit: (action === 'add' ? this.onCreate : this.onUpdate),
      onReset: () => dispatch(resetFormRecord(entity)),
      onCancel: this.onCancel
    }
  }
}
