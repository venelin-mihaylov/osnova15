import React from 'react'
import CRUDAct from 'constants/CRUDAct'
import {autobind} from 'core-decorators'
import {resetFormRecord} from 'actions/resetFormRecord'
import {push} from 'react-router-redux'
import {actions} from 'react-redux-form'
import {rrfModel, calcNextPath} from 'utils/Util'

@autobind
export default class OsnovaViewContainer extends React.Component {

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
    this.readServerRecord()
  }

  readServerRecord() {
    this.props.promiseAct(CRUDAct.READ_REQUESTED, {id: this.props.params.id})
      .then(record => this.postLoadModel(record))
  }

  postLoadModel(record) { } // eslint-disable-line

}
