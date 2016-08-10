"use strict"
import React from "react"
import {autobind} from "core-decorators"
import {connect} from "react-redux"
import {search, Search, SearchColumns} from 'reactabular';
import EasyTable from 'reactabular-easy';
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
        resizable: true
      }, cell: {
        property: 'id',
      },
      width: 50,
      visible: true
    }, {
      header: {
        label: 'Name',
        draggable: true,
        sortable: true,
        resizable: true
      }, cell: {
        property: 'name',
        highlight: true
      },
      width: 250,
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
    const cols = this.state.columns.filter(column => column.visible);

    return <div>
      <div className="search-container">
        <span>Search</span>
        <Search
          query={query}
          columns={listRecords}
          rows={listRecords}
          onChange={query => this.setState({ query })}
        />
      </div>

      <EasyTable
        rows={listRecords}
        rowKey="id"
        sortingColumns={{}}
        tableWidth={800}
        tableHeight={400}
        columns={cols}
        query={query}
        classNames={{
          table: {
            wrapper: 'pure-table pure-table-striped'
          }
        }}
        selectedRowId="id"
        headerExtra={
          <SearchColumns
            query={query}
            columns={columns}
            onChange={query => this.setState({ query })}
          />
        }
        onDragColumn={this.onDragColumn}
        onMoveColumns={this.onMoveColumns}
        onSelectRow={this.onSelectRow}
        onSort={this.onSort}
        onRow={this.onRow}
      />
    </div>
  }
}
