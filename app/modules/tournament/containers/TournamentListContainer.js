import React from 'react'
import {autobind} from 'core-decorators'
import {connect} from 'react-redux'
import EntityList from 'components/EntityList'
import OsnovaListContainer from 'components/OsnovaListContainer'
import {mapAct, mapListStateToProps} from 'utils/Util'
import curry from 'lodash/curry'
import ListSort from 'utils/ListSort'

const entity = 'tournament'
const variation = '1'

@connect(mapListStateToProps(entity, variation), mapAct(entity, variation))
@autobind
export default class TournamentListContainer extends OsnovaListContainer {
  render() {
    const {
      act,
      redux: {
        sortBy,
        sortDirection
      }
    } = this.props

    const sortHeader = curry(ListSort.sortHeader)(act, sortBy, sortDirection)

    return (<EntityList
      toolbarTitle='Tournaments'
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
          property: 'name',
          format: (name) => sortHeader(name),
        },
        cell: {
          property: 'name'
        }
      }]}
      {...this.props}
      {...(this.addProps())}
    />)
  }
}
