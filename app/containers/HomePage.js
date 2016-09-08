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
import ListSort from 'utils/ListSort'
import curry from 'lodash/curry'

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
    const {
      sortBy,
      sortDirection
    } = this.state

    const sortHeader = curry(ListSort.sortHeader)('tournament', '1', sortBy, sortDirection)

    return (<div style={{marginRight: 10}}>
      <h1>Welcome back, Gringo!</h1>
      <BaseTable
        columns={[{
          property: 'id',
          width: 200,
          header: {
            label: 'id',
            property: 'id',
            format: (name) => sortHeader(name),
          },
          cell: {
            property: 'id'
          }
        }, {
          property: 'name',
          width: 800,
          header: {
            label: 'name',
            format: (name) => sortHeader(name),
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
    </div>)
  }
}
