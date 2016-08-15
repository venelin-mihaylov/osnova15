import React from 'react'
import {Table, select} from 'reactabular'
import {autobind} from 'core-decorators'
import classNames from 'classnames'
import { mergeClassNames } from 'reactabular-utils'
import find from 'lodash/find';
import findIndex from 'lodash/findIndex';
import noop from 'lodash/noop'

import styles from 'styles/components/BaseTable.css'

@autobind
export default class BaseTable extends React.Component {

  static propTypes = {
    onSelectRow: React.PropTypes.func,
    onRow: React.PropTypes.func,
    selectedRowId: React.PropTypes.any,
    selectedRowRecord: React.PropTypes.object,
    selectedRowIdField: React.PropTypes.string
  }

  static defaultProps = {
    onSelectRow: noop,
    selectedRowIdField: 'id',
    onRow: () => ({})
  }

  constructor() {
    super()
  }

  onRow(row, rowIndex) {
    const {
      selectedRowId,
      selectedRowIdField,
      onRow,

    } = this.props
    const { className, ...props } = onRow(row, rowIndex)
    const selected = row[selectedRowIdField] == selectedRowId
    return {
      className: mergeClassNames(className, selected && styles.selectedRow),
      selected,
      onClick: () => this.selectRow(rowIndex),
      ...props
    };
  }
  selectRow(selectedRowIndex) {
    const { selectedRowIdField, rows} = this.props;

    const selected = select.row({
      rows,
      isSelected: (row, selectedRowId) => row[selectedRowIdField] === selectedRowId,
      selectedRowId: rows[selectedRowIndex][selectedRowIdField]
    });

    this.props.onSelectRow({
      selectedRowId: selected.selectedRow[selectedRowIdField],
      selectedRow: selected.selectedRow
    });
  }

  render() {
    const {
      columns,
      rows,
      rowKey,
      onRow, // exclude
      onSelectRow, // exclude
      selectedRowId,
      selectedRow,
      ...rest
    } = this.props // eslint-disable-line no-unused-vars

    const selectedRowIndex = findIndex(rows, {[rowKey]: selectedRowId})

    return select.byArrowKeys({
      rows,
      selectedRowIndex,
      onSelectRow: this.selectRow,
    })(<Table.Provider
      className="pure-table pure-table-striped"
      columns={columns}
    >
      <Table.Header />

      <Table.Body
        onRow={this.onRow}
        {...{rows, rowKey}}
        {...rest}/>
    </Table.Provider>)
  }
}