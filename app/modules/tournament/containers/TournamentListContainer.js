"use strict"
import React from "react"
import {autobind} from "core-decorators"
import {connect} from "react-redux"
import EntityList from 'components/EntityList'
import CRUDAct from 'constants/CRUDAct'
import OsnovaListContainer from 'components/OsnovaListContainer''

@connect(state => ({redux: state.tournament}))
@autobind
export default class TournamentListContainer extends OsnovaListContainer {

  static entity = 'tournament'

  constructor(props) {
    super(props);

    this.state = {
      columns: this.getColumns(),
      query: {}
    };

    this.act = CRUDAct.act(this.constructor.entity)
  }

  componentWillMount() {
    this.props.dispatch(this.act(CRUDAct.LIST_REQUESTED))
  }

  getColumns() {
    return [{
      header: {
        label: 'id',
        draggable: true,
        sortable: true,
        resizable: true,
      }, cell: {
        property: 'id',
      },
      width: 200,
      visible: true
    }, {
      header: {
        label: 'Name',
        draggable: true,
        sortable: true,
        resizable: true,
      }, cell: {
        property: 'name',
        highlight: true,

      },
      width: 800,
      visible: true
    }]
  }

  render() {

    const {
      dispatch,
      redux: {
        listRecords,
        listSelectedId
      }
    } = this.props

    const columns = this.getColumns()

    const {
      query
    } = this.state

    return <EntityList
        columns={columns}
        tableWidth="100%"
        rows={listRecords}
        classNames={{
          table: {
            wrapper: 'pure-table pure-table-striped'
          }
        }}
        {...this.addProps()}
      />
  }
}
