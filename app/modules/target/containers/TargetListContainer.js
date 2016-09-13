import React from 'react'
import {autobind} from 'core-decorators'
import {connect} from 'react-redux'
import EntityList from 'components/EntityList'
import OsnovaListContainer from 'components/OsnovaListContainer'
import {mapAct, mapListStateToProps, formatEnum} from 'utils/Util'
import {Icon} from 'stardust'
import TargetSchema from '../../../../universal/model/schema/TargetSchema'

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
        property: 'favourite',
        props: {
          style: {
            width: 20
          }
        },
        header: {
          label: 'Fav'
        },
        cell: {
          property: 'favourite',
          format: v => v && <Icon name='heart' size='large' />
        }
      }, {
        property: 'name',
        header: {
          label: 'name'
        },
        cell: {
          property: 'name'
        }
      }, {
        property: 'type',
        header: {
          label: 'Type'
        },
        cell: {
          format: formatEnum(TargetSchema)
        }
      }, {
        property: 'target_zone',
        header: {
          label: 'Zones'
        },
        cell: {
          format: (zones) => zones && zones.map(z => <div>{z.name} - {z.width} - {z.height}</div>)
        }
      }]}
      {...this.props}
      {...(this.addProps())}
    />)
  }
}
