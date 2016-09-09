import React from 'react'
import {autobind} from 'core-decorators'
import CRUDAct from 'constants/CRUDAct'
import {calcNextPath} from 'utils/Util'
import {push} from 'react-router-redux'

@autobind
export default class OsnovaListContainer extends React.Component {

  static propTypes = {
    entity: React.PropTypes.string,
    variation: React.PropTypes.string,
    dispatch: React.PropTypes.func,
    redux: React.PropTypes.shape({
      limit: React.PropTypes.number,
      page: React.PropTypes.number,
      sortBy: React.PropTypes.string,
      sortDirection: React.PropTypes.string
    }),
    location: React.PropTypes.any,
    act: React.PropTypes.func,
    promiseAct: React.PropTypes.func,
  }

  componentWillMount() {
    this.listServerRecords()
  }

  onSelectRow({selectedRowId: id, selectedRow: record, rows: records}) {
    this.props.act(CRUDAct.LIST_SET_SELECTION, {id, record, records})
  }

  onAddClick() {
    this.props.dispatch(push(this.nextPath({action: 'add'})))
  }

  onEditClick() {
    const {
      dispatch,
      redux: {
        selectedId: id,
        listSelectedRecord: record
      }
    } = this.props

    if (id) {
      dispatch(push(this.nextPath({action: 'edit', id, record})))
    }
  }

  onDeleteClick() {
    const {
      redux: {
        selectedId: id,
        listSelectedRecord: record
      }
    } = this.props

    if (id) {
      this.props.promiseAct(CRUDAct.DELETE_REQUESTED, {id, record})
        .then(() => this.props.promiseAct(CRUDAct.LIST_REQUESTED))
        .then(() => this.props.promiseAct(CRUDAct.LIST_CLEAR_SELECTION))
    }
  }

  onRefresh() {
    this.props.act(CRUDAct.LIST_REQUESTED)
  }

  baseListParams() {
    return {}
  }

  listServerRecords() {
    this.props.act(CRUDAct.LIST_REQUESTED)
  }

  nextPath({action, id, record}) {
    const {location: {pathname}} = this.props
    return calcNextPath({pathname, action, id, record})
  }

  onNextPage() {
    this.props.act(CRUDAct.LIST_SET_PAGE, this.props.redux.page + 1)
    this.props.act(CRUDAct.LIST_REQUESTED)
  }

  onPrevPage() {
    const {redux: {page}} = this.props
    if (page > 1) {
      this.props.act(CRUDAct.LIST_SET_PAGE, page - 1)
      this.props.act(CRUDAct.LIST_REQUESTED)
    }
  }

  onLimitChange(e, limit) {
    console.log('onLimitChange')
    this.props.act(CRUDAct.LIST_SET_LIMIT, limit)
    this.props.act(CRUDAct.LIST_REQUESTED)
  }

  addProps() {
    return {
      onAddClick: this.onAddClick,
      onEditClick: this.onEditClick,
      onDeleteClick: this.onDeleteClick,
      onNextPage: this.onNextPage,
      onPrevPage: this.onPrevPage,
      onRefresh: this.onRefresh,
      onLimitChange: this.onLimitChange,
      onSelectRow: this.onSelectRow,
    }
  }
}
