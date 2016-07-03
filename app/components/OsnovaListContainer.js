import React from 'react'
import {autobind} from 'core-decorators'
import CRUDActionType from 'constants/CRUDActionType'
import {toUri} from 'utils/Util'
import {push} from 'react-router-redux'
import {bindActionCreators} from 'redux'

export default class OsnovaListContainer extends React.Component {

  static entity = null

  constructor() {
    super()
    this.act = CRUDActionType.act(this.constructor.entity)
  }

  componentWillMount() {
    this.listServerRecords()
  }

  @autobind
  listServerRecords() {
    this.props.dispatch(this.act(CRUDActionType.LIST_REQUESTED))
  }

  @autobind
  uri({action, id}) {
    return toUri([this.constructor.entity, id, action])
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
      onDeleteClick: () => withFirstSelection(r => boundAct(CRUDActionType.DELETE_REQUESTED, {id: r.id})),
      onRefresh: () => boundAct(CRUDActionType.LIST_REQUESTED),
      onLimitChange: (e, limit) => boundAct(CRUDActionType.LIST_SET_LIMIT, {limit: limit}),
    }
  }



}