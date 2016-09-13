import React from 'react'
import {autobind} from 'core-decorators'
import {connect} from 'react-redux'
import EntityList from 'components/EntityList'
import OsnovaListContainer from 'components/OsnovaListContainer'
import {mapAct, mapListStateToProps} from 'utils/Util'

const entity = 'tournament'
const variation = '1'

@connect(mapListStateToProps(entity, variation), mapAct(entity, variation))
@autobind
export default class TournamentListContainer extends OsnovaListContainer {
  render() {
    const sortable = this.curriedSortable()
    return (<EntityList
      toolbarTitle='Tournaments'
      columns={[{
        property: 'id',
        width: 200,
        header: {
          label: 'id',
          property: 'id',
          transforms: [sortable]
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
          transforms: [sortable]
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
