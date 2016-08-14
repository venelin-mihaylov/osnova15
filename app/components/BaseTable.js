import React from 'react'
import {Table} from 'reactabular'
import EasyTable from 'reactabular-easy'
import {autobind} from 'core-decorators'
import classnames from 'classnames'

import styles from 'styles/components/BaseTable.css'

@autobind
export default class BaseTable extends React.Component {

  constructor() {
    super()
  }

  onRow(row, rowIndex) {
    return  {
      className: classnames(
        rowIndex % 2 ? 'odd-row' : 'even-row',
        row.selected && styles.selectedRow
      )
    }
  }

  render() {
    return <Table.Provider
      className="pure-table pure-table-striped"
      columns={columns}
    >
      <Table.Header />

      <Table.Body rows={rows} rowKey="id" />
    </Table.Provider>
  }
}