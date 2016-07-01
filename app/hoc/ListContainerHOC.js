import React from 'react'
import {getDisplayName} from 'recompose'
import {push} from 'react-router-redux'
import CRUDActionType from 'constants/CRUDActionType'
import {autobind} from 'core-decorators'
import {log, toUri} from 'utils/Util'



export default function ListContainerHOC({entity, calcCRUDUri}) {

  return function ListContainerHOC(Component) {
    return class ListContainerHOC extends React.Component {

      static entity = entity
      static calcCRUDUri = calcCRUDUri
      static displayName = `ListContainerHOC(${getDisplayName(Component)})`

      componentWillMount() {
        this.props.dispatch({type: CRUDActionType.prefixType(this.constructor.entity, CRUDActionType.LIST_REQUESTED)})
      }

      @autobind
      uri({action, id = ''}) {
        const cb = this.constructor.calcCRUDUri
        const entity = this.constructor.entity
        if(typeof cb == 'function') {
          return cb(this.props, {action, id, entity});
        } else {
          return toUri([entity, id, action])
        }
      }

      @autobind
      render() {
        const entity = this.constructor.entity
        const act = CRUDActionType.act(entity)
        const {
          dispatch,
          withFirstSelection,
          onAddClick = () => dispatch(push(this.uri({action: 'add'}))),
          onEditClick = () => withFirstSelection(r => dispatch(push(this.uri({action: 'edit', id: r.id})))),
          onDeleteClick = () => withFirstSelection(r => dispatch(act(CRUDActionType.DELETE_REQUESTED, {id: r.id}))),
          onRefresh = () => dispatch(act(CRUDActionType.LIST_REQUESTED)),
          onLimitChange = (e, limit) => dispatch(act(CRUDActionType.LIST_SET_LIMIT, {limit: limit})),
          ...rest
        } = this.props

        return <Component
          {...{act, entity}}
          {...{dispatch, withFirstSelection}}
          {...{onAddClick, onEditClick, onDeleteClick, onRefresh, onLimitChange}}
          {...rest}
        />
      }
    }
  }
}