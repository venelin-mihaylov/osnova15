import React from 'react'
import {Table, select} from 'reactabular'
import {autobind} from 'core-decorators'
import {mergeClassNames} from 'reactabular-utils'
import findIndex from 'lodash/findIndex'
import noop from 'lodash/noop'

import styles from 'styles/components/BaseTable.css'

@autobind
export default class BaseTable extends React.Component {
  static propTypes = {
    columns: React.PropTypes.any.isRequired,
    rows: React.PropTypes.any.isRequired,
    rowKey: React.PropTypes.string.isRequired,
    onSelectRow: React.PropTypes.func.isRequired,
    onRow: React.PropTypes.func,
    selectedRowId: React.PropTypes.number,
    selectedRowIdField: React.PropTypes.string.isRequired,
  }

  static defaultProps = {
    onRow: () => ({}),
    onSelectRow: noop,
    rowKey: 'id',
    selectedRowIdField: 'id',
  }

  componentWillMount() {
    this.setState({
      orderBy: 'id',
      orderDirection: 'asc'
    })
  }

  onRow(row, {rowIndex}) {
    const {
      selectedRowId,
      selectedRowIdField,
      onRow,

    } = this.props
    const {className, ...props} = onRow(row, rowIndex)
    const selected = row[selectedRowIdField] === selectedRowId
    return {
      className: mergeClassNames(className, selected && styles.selectedRow),
      selected,
      onClick: () => this.selectRow(rowIndex),
      ...props,
    }
  }

  selectRow(selectedRowIndex) {
    const {selectedRowIdField, rows} = this.props

    const selected = select.row({
      rows,
      selectedRowId: rows[selectedRowIndex][selectedRowIdField],
    })

    this.props.onSelectRow({
      selectedRowId: selected.selectedRow[selectedRowIdField],
      selectedRow: selected.selectedRow,
      rows: selected.rows
    })
  }

  sort(orderBy, orderDirection) {
    this.setState({
      orderBy,
      orderDirection
    })
  }

  render() {
    const {
      columns,
      rows,
      rowKey,
      onRow, // eslint-disable-line
      onSelectRow, // eslint-disable-line
      selectedRowId,
      selectedRowIdField,
      ...rest,
    } = this.props // eslint-disable-line no-unused-vars

    const selectedRowIndex = findIndex(rows, {[selectedRowIdField]: selectedRowId})
    return select.byArrowKeys({
      rows,
      selectedRowIndex,
      onSelectRow: this.selectRow,
    })(<Table.Provider
      className='ui celled selectable striped table'
      columns={columns}
      style={{
        width: '100%',
      }}
    >
      <Table.Header />

      <Table.Body
        onRow={this.onRow}
        rows={rows}
        rowKey={rowKey}
        {...rest}
      />
    </Table.Provider>)
  }
}
