import React from 'react'
import {autobind} from 'core-decorators'
import {connect} from 'react-redux'
import EntityList from 'components/EntityList'
import OsnovaListContainer from 'components/OsnovaListContainer'

const entity = 'tournament'

@connect(state => ({redux: state[entity]}))
@autobind
export default class TournamentListContainer extends OsnovaListContainer {

  static entity = entity

  render() {
    return (<EntityList
      toolbarTitle='Tournaments'
      columns={[{
        property: 'id',
        width: 200,
        header: {
          label: 'id',
          property: 'id'
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
      {...this.props}
      {...(this.addProps())}
    />)
  }
}
