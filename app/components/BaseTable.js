import React from 'react'
import {Table, select} from 'reactabular'
import {autobind} from 'core-decorators'
import classNames from 'classnames'
import find from 'lodash/find';
import findIndex from 'lodash/findIndex';
import noop from 'lodash/noop'

import styles from 'styles/components/BaseTable.css'

@autobind
export default class BaseTable extends React.Component {

  static propTypes = {
    onSelectRow: React.PropTypes.func
  }

  defaultProps = {
    onSelectRow: noop
  }

  constructor() {
    super()
  }

  onRow(row, rowIndex) {
    const {
      rows,
      rowKey,
      selectedRowId
    } = this.props


    const selected = !!find(rows, {[rowKey]: selectedRowId})
    return {
      className: classNames({
        [styles.selectedRow]: selected
      }),
      selected,
      onClick: () => this.props.onSelectRow(rowIndex)
    }
  }

  render() {

    const {
      columns,
      rows,
      rowKey,
      onSelectRow,
      selectedRowId,
      ...rest
    } = this.props

    const selectedRowIndex = findIndex(rows, {rowKey: selectedRowId})

    return select.byArrowKeys({
      rows,
      selectedRowIndex,
      onSelectRow,
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