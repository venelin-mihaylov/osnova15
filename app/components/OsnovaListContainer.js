import React from 'react'
import {autobind} from 'core-decorators'
import CRUDAct from 'constants/CRUDAct'
import {calcNextPath} from 'utils/Util'
import {push} from 'react-router-redux'
import {bindActionCreators} from 'redux'

export default class OsnovaListContainer extends React.Component {

  static entity = null

  constructor() {
    super()
    this.act = CRUDAct.act(this.constructor.entity)
  }

  baseListParams() {
    return {}
  }

  componentWillMount() {
    this.listServerRecords()
  }

  @autobind
  listServerRecords() {
    this.props.dispatch(this.act(CRUDAct.LIST_REQUESTED, this.baseListParams()))
  }

  @autobind
  nextPath({action, id, record}) {
    const {location: {pathname}} = this.props
    return calcNextPath({pathname, action, id, record})
  }

  @autobind
  onAddClick() {
    this.props.dispatch(push(this.nextPath({action: 'add'})))
  }

  @autobind
  onEditClick() {
    const {
      dispatch,
      withFirstSelection
    } = this.props

    withFirstSelection((record) => dispatch(push(this.nextPath({action: 'edit', id: record.id, record}))))
  }

  @autobind
  onDeleteClick() {
    const {
      dispatch,
      withFirstSelection
    } = this.props

    withFirstSelection(({id}) => dispatch(this.act(CRUDAct.DELETE_REQUESTED, {id, listParams: this.baseListParams()})))
  }

  @autobind
  onRefresh() {
    const promiseAct = CRUDAct.promiseAct(this.props.dispatch, this.constructor.entity)
    promiseAct(CRUDAct.LIST_REQUESTED, this.baseListParams()).then((records) => {
      console.log(records)
    })
  }

  @autobind
  addProps() {
    const {
      dispatch
    } = this.props
    const act = this.act
    const promiseAct = CRUDAct.promiseAct(dispatch, this.constructor.entity)
    const entity = this.constructor.entity

    return {
      entity,
      act,
      promiseAct,
      onAddClick: this.onAddClick,
      onEditClick: this.onEditClick,
      onDeleteClick: this.onDeleteClick,
      onRefresh: this.onRefresh,
      onLimitChange: (e, limit) => promiseAct(CRUDAct.LIST_SET_LIMIT, {limit}),
    }
  }



}