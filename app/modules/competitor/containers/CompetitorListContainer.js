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
export default class CompetitorListContainer extends OsnovaListContainer {

  static entity = entity
  static variation = variation

  render() {
    return (<EntityList
      toolbarTitle='Competitors'
      columns={[{
        property: 'id',
        header: {
          label: 'id'
        },
      }, {
        property: 'firstName',
        header: {
          label: 'firstName'
        },
      }, {
        property: 'lastName',
        header: {
          label: 'lastName'
        }
      }, {
        property: 'email',
        header: {
          label: 'email'
        },
      }]}
      {...this.props}
      {...(this.addProps())}
    />)
  }
}
