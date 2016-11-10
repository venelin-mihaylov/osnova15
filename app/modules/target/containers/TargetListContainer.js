import React from 'react'
import {autobind} from 'core-decorators'
import {connect} from 'react-redux'
import EntityList from 'components/EntityList'
import OsnovaListContainer from 'components/OsnovaListContainer'
import {mapAct, mapListStateToProps, formatEnum} from 'utils/Util'
import {Icon} from 'semantic-ui-react'
import TargetSchema from '../../../../universal/model/schema/TargetSchema'

const entity = 'target'
const variation = '1'

@connect(mapListStateToProps(entity, variation), mapAct(entity, variation))
@autobind
export default class TargetListContainer extends OsnovaListContainer {

  static entity = 'target'

  baseFilter() {
    if (this.props.route.matchView) {
      return {
        matchId: this.props.params.matchId
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
        property: 'thumbnail',
        header: {
          label: 'Image'
        },
        cell: {
          format: (v) => v && <img alt='thumbnail' src={v} />
        },
        props: {
          width: 200
        }
      }, {
        property: 'name',
        header: {
          label: 'name'
        },
        cell: {
          format: (v, {rowData}) => <span>{rowData.favourite && <Icon name='heart' />} {v}</span>
        },
        props: {
          width: 200
        }
      }, {
        property: 'type',
        header: {
          label: 'Type'
        },
        cell: {
          format: formatEnum(TargetSchema)
        },
        props: {
          width: 100
        }
      }, {
        property: 'target_zone',
        header: {
          label: 'Zones'
        },
        cell: {
          format: (zones) => zones && zones.map(z => <div>{z.name} - {z.width} - {z.height}</div>)
        },
        props: {
          width: 200
        }
      }]}
      {...this.props}
      {...(this.addProps())}
    />)
  }
}
