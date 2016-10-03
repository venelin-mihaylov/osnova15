import React from 'react'
import CRUDAct from 'constants/CRUDAct'
import {autobind} from 'core-decorators'
import {resetFormRecord} from 'actions/resetFormRecord'
import {push} from 'react-router-redux'
import {actions} from 'react-redux-form'
import {rrfModel, calcNextPath, rrfSetValid} from 'utils/Util'

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
      redux = {}, // eslint-disable-line
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

  onCreate(record, options = {}) {
    const nextPath = this.nextPath({action: 'create'})
    this.props.promiseAct(CRUDAct.CREATE_REQUESTED, {record, nextPath, ...options})
      .then(() => this.props.dispatch(push(nextPath)))
  }

  onUpdate(record, options = {}) {
    const nextPath = this.nextPath({action: 'update'})
    this.props.promiseAct(CRUDAct.UPDATE_REQUESTED, {record, ...options})
      .then(() => this.props.dispatch(push(nextPath)))
  }

  onReset(e) {
    e.preventDefault()
    this.props.dispatch(resetFormRecord(this.props.entity))
  }

  onCancel(e) {
    e.preventDefault()
    const {dispatch} = this.props
    const nextPath = this.nextPath({action: 'cancel'})
    this.resetForm()
    dispatch(push(nextPath))
  }

  onSubmit(...args) {
    if (this.props.route.action === 'add') {
      return this.onCreate(...args)
    }
    if (this.props.route.action === 'edit') {
      return this.onUpdate(...args)
    }

    throw new Error('Missing "action" route param')
  }

  nextPath({action, id}) {
    const {location: {pathname}} = this.props
    return calcNextPath({pathname, action, id})
  }

  resetForm() {
    this.props.dispatch(actions.reset(rrfModel(this.props.entity)))
  }

  loadModel(record) {
    this.props.dispatch(actions.reset(rrfModel(this.props.entity)))
    this.props.dispatch(actions.load(rrfModel(this.props.entity), record))

    rrfSetValid({
      dispatch: this.props.dispatch,
      entity: this.props.entity,
      record
    })
  }

  readServerRecord() {
    this.props.promiseAct(CRUDAct.READ_REQUESTED, {id: this.props.params.id})
      .then(record => this.loadModel(record))
  }

  addProps() {
    const {
      route: {
        action
      }
    } = this.props

    return {
      action,
      onSubmit: this.onSubmit,
      onReset: this.onReset,
      onCancel: this.onCancel
    }
  }
}
