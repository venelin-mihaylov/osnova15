import React from 'react'
import {autobind} from 'core-decorators'
import CRUDAct from 'constants/CRUDAct'
import {toUri} from 'utils/Util'
import {push} from 'react-router-redux'
import {bindActionCreators} from 'redux'

export default class OsnovaListContainer extends React.Component {

  static entity = null

  constructor() {
    super()
    this.act = CRUDAct.act(this.constructor.entity)
  }

  serverListParams() {
    return null
  }

  componentWillMount() {
    this.listServerRecords()
  }

  @autobind
  listServerRecords() {
    this.props.dispatch(this.act(CRUDAct.LIST_REQUESTED, this.serverListParams()))
  }

  @autobind
  uri({action, id}) {
    return toUri(this.constructor.entity, id, action)
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
      onAddClick: () => dispatch(push(this.uri({action: 'add'}))),
      onEditClick: () => withFirstSelection(r => dispatch(push(this.uri({action: 'edit', id: r.id})))),
      onDeleteClick: () => withFirstSelection(r => boundAct(CRUDAct.DELETE_REQUESTED, {id: r.id})),
      onRefresh: () => boundAct(CRUDAct.LIST_REQUESTED, this.serverListParams()),
      onLimitChange: (e, limit) => boundAct(CRUDAct.LIST_SET_LIMIT, {limit: limit}),
    }
  }



}