import React from 'react'
import CRUDAct from 'constants/CRUDAct'
import {autobind} from 'core-decorators'
import {resetFormRecord} from 'actions/resetFormRecord'
import {push} from 'react-router-redux'
import {actions} from 'react-redux-form'
import {rrfModel, calcNextPath, rrfSetValid, rrfSetPristine} from 'utils/Util'

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

  onCreate(record, options = {}) {
    const nextPath = this.nextPath({action: 'create'})
    this.props.act(CRUDAct.CREATE_REQUESTED, {record, nextPath, ...options})
  }

  onUpdate(record, options = {}) {
    const nextPath = this.nextPath({action: 'update'})
    this.props.act(CRUDAct.UPDATE_REQUESTED, {record, nextPath, ...options})
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

  nextPath({action, id}) {
    const {location: {pathname}} = this.props
    return calcNextPath({pathname, action, id})
  }

  resetForm() {
    this.props.dispatch(actions.reset(rrfModel(this.props.entity)))
  }

  readServerRecord() {
    this.props.promiseAct(CRUDAct.READ_REQUESTED, {id: this.props.params.id})
      .then(record => {
        rrfSetValid({
          dispatch: this.props.dispatch,
          entity: this.props.entity,
          record
        })
        rrfSetPristine({
          dispatch: this.props.dispatch,
          entity: this.props.entity,
          record
        })
      })
  }

  addProps() {
    const {
      route: {
        action
      }
    } = this.props

    return {
      action,
      onSubmit: (action === 'add' ? this.onCreate : this.onUpdate),
      onReset: this.onReset,
      onCancel: this.onCancel
    }
  }
}
