"use strict"
import React from "react"
import {autobind} from "core-decorators"
import {connect} from "react-redux"
import BaseTable from 'components/BaseTable'
import CRUDAct from 'constants/CRUDAct'

@connect(state => ({redux: state.tournament}))
@autobind
export default class TournamentListContainer extends React.Component {

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

  onSelectRow({ selectedRowId, selectedRow }) {
    console.log('onSelectRow', selectedRowId, selectedRow);
  }

  onSort(sortingColumns) {
    console.log('onSort', sortingColumns);
  }

  onRow(row, rowIndex) {
    return {
      className: rowIndex % 2 ? 'odd-row' : 'even-row'
    };
  }

  onRemove(id) {
    console.log('remove ' + id)
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

  onDragColumn(width, columnIndex) {
    console.log('onDragColumn', width, columnIndex);
  }
  onMoveColumns(columns) {
    console.log('onMoveColumns', columns);
  }

  render() {

    const {
      dispatch,
      redux: {
        listRecords
      }
    } = this.props

    const {
      columns,
      query
    } = this.state

    return <div>
      <BaseTable
        rows={listRecords}
        rowKey="id"
        sortingColumns={{}}
        columns={columns}
        query={query}
        classNames={{
          table: {
            wrapper: 'pure-table pure-table-striped'
          }
        }}
        selectedRowId="id"
        onDragColumn={this.onDragColumn}
        onMoveColumns={this.onMoveColumns}
        onSelectRow={this.onSelectRow}
        onSort={this.onSort}
        onRow={this.onRow}
      />
    </div>
  }
}
