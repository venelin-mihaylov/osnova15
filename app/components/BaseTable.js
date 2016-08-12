import React from 'react'
import {Table} from 'reactabular'
import EasyTable from 'reactabular-easy'
import {autobind} from 'core-decorators'
import classnames from 'classnames'
import {log} from 'utils/Util'

import styles from 'styles/components/BaseTable.css'


@autobind
export default class BaseTable extends React.Component {


  constructor() {
    super()

    this.state = {
      selectedRowId: null
    }
  }

  onSelectRow({ selectedRowId, selectedRow }) {
    console.log('onSelectRow', selectedRowId, selectedRow)
    this.setState({selectedRowId})
  }

  onSort(sortingColumns) {
    console.log('onSort', sortingColumns)
  }

  onRow(row, rowIndex) {
    return  {
      className: classnames(
        rowIndex % 2 ? 'odd-row' : 'even-row',
        row.selected && styles.selectedRow
      )
    }
  }

  onRemove(id) {
    console.log('remove ' + id)
  }

  onDragColumn(width, columnIndex) {
    console.log('onDragColumn', width, columnIndex)
  }
  onMoveColumns(columns) {
    console.log('onMoveColumns', columns)
  }


  render() {
    return <EasyTable
      selectedRowId={this.state.selectedRowId}
      onDragColumn={this.onDragColumn}
      onMoveColumns={this.onMoveColumns}
      onSelectRow={this.onSelectRow}
      onSort={this.onSort}
      onRow={this.onRow}
      {...this.props}/>
  }
}