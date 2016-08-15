import React from 'react'
import {autobind} from 'core-decorators'
import CRUDAct from 'constants/CRUDAct'
import {calcNextPath} from 'utils/Util'
import {push} from 'react-router-redux'
import {bindActionCreators} from 'redux'

@autobind
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

  onSelectRow({selectedRowId: id, selectedRow: record}) {
    console.log(`onSelectRow: ${id}`)
    this.props.dispatch(this.act(CRUDAct.LIST_SET_SELECTION, {id, record}))
  }

  listServerRecords() {
    this.props.dispatch(this.act(CRUDAct.LIST_REQUESTED, this.baseListParams()))
  }

  nextPath({action, id, record}) {
    const {location: {pathname}} = this.props
    return calcNextPath({pathname, action, id, record})
  }

  onAddClick() {
    this.props.dispatch(push(this.nextPath({action: 'add'})))
  }

  onEditClick() {
    const {
      dispatch,
      redux: {
        listSelectedId: id,
        listSelectedRecord: record
      }
    } = this.props

    if(id) {
      dispatch(push(this.nextPath({action: 'edit', id, record})))
    }
  }

  onDeleteClick() {
    const {
      dispatch,
      redux: {
        listSelectedId: id,
        listSelectedRecord: record
      }
    } = this.props

    if(id) {
      const promiseAct = CRUDAct.promiseAct(dispatch, this.constructor.entity)
      promiseAct(CRUDAct.DELETE_REQUESTED, {id, record}).then(() => {
        return promiseAct(CRUDAct.LIST_REQUESTED, this.baseListParams())
      })
    }
  }

  onRefresh() {
    const promiseAct = CRUDAct.promiseAct(this.props.dispatch, this.constructor.entity)
    promiseAct(CRUDAct.LIST_REQUESTED, this.baseListParams())
  }

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
      onSelectRow: this.onSelectRow,
    }
  }
}