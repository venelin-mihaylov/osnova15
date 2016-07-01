import React from 'react'
import {getDisplayName} from 'recompose'
import {push} from 'react-router-redux'
import CRUDActionType from 'constants/CRUDActionType'
import {autobind} from 'core-decorators'
import {log} from 'utils/Util'



export default function ListContainerHOC({entity, basePath = entity}) {

  return function ListContainerHOC(Component) {
    return class ListContainerHOC extends React.Component {

      static entity = entity
      static basePath = basePath
      static displayName = `ListContainerHOC(${getDisplayName(Component)})`

      componentWillMount() {
        this.props.dispatch({type: CRUDActionType.prefixType(this.constructor.entity, CRUDActionType.LIST_REQUESTED)})
      }

      @autobind
      actionPath({action, id = ''}) {
        const basePath = this.constructor.basePath
        if(typeof basePath == 'function') {
          return basePath(this.props, {action, id});
        } else {
          return `/${basePath}/${id}/${action}`.replace('//', '/')
        }
      }

      @autobind
      render() {
        const entity = this.constructor.entity
        const act = CRUDActionType.act(entity)
        const {
          dispatch,
          withFirstSelection,
          onAddClick = () => dispatch(push(this.actionPath({action: 'add'}))),
          onEditClick = () => withFirstSelection(r => dispatch(push(this.actionPath({action: 'edit', id: r.id})))),
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