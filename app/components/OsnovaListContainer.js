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

  addProps() {
    const {
      dispatch,
      withFirstSelection
    } = this.props
    const act = this.act
    const boundAct = bindActionCreators(act, dispatch)
    const entity = this.constructor.entity

    return {
      entity,
      act,
      boundAct,
      onAddClick: this.onAddClick,
      onEditClick: this.onEditClick,
      onDeleteClick: this.onDeleteClick,
      onRefresh: () => boundAct(CRUDAct.LIST_REQUESTED, this.baseListParams()),
      onLimitChange: (e, limit) => boundAct(CRUDAct.LIST_SET_LIMIT, {limit}),
    }
  }



}