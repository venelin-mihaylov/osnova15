import React from 'react';
import {getDisplayName} from 'recompose';
import {push} from 'react-router-redux';
import CRUDActionType from 'constants/CRUDActionType';

export default function ListContainerHOC(entity) {

  return function ListContainerHOC(Component) {
    return class ListContainerHOC extends React.Component {

      static entity = entity;
      static displayName = `ListContainerHOC(${getDisplayName(Component)})`;

      componentWillMount() {
        this.props.dispatch({type: CRUDActionType.prefix(this.constructor.entity, CRUDActionType.LIST_REQUESTED)})
      }

      render() {
        const entity = this.constructor.entity;
        const act = CRUDActionType.act(entity);
        const {
          dispatch,
          withFirstSelection,
          onRowSelection,
        } = this.props;

        return <Component
          onAddClick={() => dispatch(push(`/${entity}/add`))}
          onEditClick={() => withFirstSelection(r => dispatch(push(`/${entity}/edit/${r.id}`)))}
          onDeleteClick={() => withFirstSelection(r => dispatch(act(CRUDActionType.DELETE_REQUESTED, {id: r.id})))}
          onRefresh={() => dispatch(act(CRUDActionType.LIST_REQUESTED))}
          onLimitChange={(e, limit) => dispatch(act(CRUDActionType.LIST_SET_LIMIT, {limit: limit}))}
          onRowSelection={onRowSelection}
          entity={entity}
          {...this.props}
        />
      }
    }
  }
};