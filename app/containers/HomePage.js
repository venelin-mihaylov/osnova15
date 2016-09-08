/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a neccessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react'
import BaseTable from 'components/BaseTable'
import {autobind} from 'core-decorators'
import TablePagination from 'components/TablePagination'

@autobind
export default class HomePage extends React.Component { // eslint-disable-line react/prefer-stateless-function

  constructor() {
    super()
    this.state = {
      sortBy: null,
      sortDirection: null
    }
  }

  render() {
    return (<div style={{marginRight: 10}}>
      <h1>Welcome back, Gringo!</h1>
      <BaseTable
        columns={[{
          property: 'id',
          width: 200,
          header: {
            label: 'id',
            property: 'id',
          },
          cell: {
            property: 'id'
          }
        }, {
          property: 'name',
          width: 800,
          header: {
            label: 'name',
            property: 'name'
          },
          cell: {
            property: 'name'
          }
        }]}
        rows={[{
          id: 1,
          name: 'test1'
        }]}
      />
      <TablePagination
        countPages={10}
        page={1}
        onSetPage={() => null}
        onNextPage={() => null}
        onPrevPage={() => null}
      />
    </div>)
  }
}
