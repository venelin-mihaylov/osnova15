import React from 'react'
import {autobind} from 'core-decorators'
import {connect} from 'react-redux'
import EntityList from 'components/EntityList'
import OsnovaListContainer from 'components/OsnovaListContainer'
import {mapAct, mapListStateToProps} from 'utils/Util'
import curry from 'lodash/curry'
import ListSort from 'utils/ListSort'

const entity = 'target'
const variation = '1'

@connect(mapListStateToProps(entity, variation), mapAct(entity, variation))
@autobind
export default class TargetListContainer extends OsnovaListContainer {

  static entity = 'target'

  baseListParams() {
    if (this.props.route.matchView) {
      return {
        filter: {
          matchId: this.props.params.matchId
        }
      }
    }
    return {}
  }

  render() {
    const {
      route: {
        matchView
      }
    } = this.props

    return (<EntityList
      toolbarShow={!matchView}
      toolbarTitle='Targets'
      columns={[{
        property: 'id',
        header: {
          label: 'id'
        },
        cell: {
          property: 'id'
        }
      }, {
        property: 'name',
        header: {
          label: 'name'
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
