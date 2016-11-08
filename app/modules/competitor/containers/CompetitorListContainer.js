import React from 'react'
import {autobind} from 'core-decorators'
import {connect} from 'react-redux'
import EntityList from 'components/EntityList'
import OsnovaListContainer from 'components/OsnovaListContainer'
import {mapAct, mapListStateToProps, formatCountry} from 'utils/Util'


const entity = 'competitor'
const variation = '1'

@connect(mapListStateToProps(entity, variation), mapAct(entity, variation))
@autobind
export default class CompetitorListContainer extends OsnovaListContainer {
  render() {
    const sortable = this.curriedSortable()
    return (<EntityList
      toolbarTitle='Competitors'
      filterSchema={{
        name: {
          label: 'Name',
          type: 'string',
          operators: ['ilike', 'inotlike', '=', '<>']
        },
        email: {
          label: 'Email',
          type: 'string',
          operators: ['ilike', 'inotlike']
        },
        country: {
          label: 'Country',
          operators: ['='],
          type: 'string',
          enumProps: {
            bg: 'Bulgaria',
            uk: 'UK',
            pl: 'Poland'
          }
        }
      }}
      columns={[{
        property: 'country',
        header: {
          label: 'Country',
          transforms: [sortable]
        },
        cell: {
          format: formatCountry
        }
      }, {
        property: 'firstName',
        header: {
          label: 'firstName',
          transforms: [sortable]
        },
      }, {
        property: 'lastName',
        header: {
          label: 'lastName',
          transforms: [sortable]
        }
      }, {
        property: 'email',
        header: {
          label: 'email',
          transforms: [sortable]
        },
      }, {
        property: 'phone',
        header: {
          label: 'phone'
        },
      }, {
        property: 'club',
        header: {
          label: 'club'
        },
      }]}
      {...this.props}
      {...(this.addProps())}
    />)
  }
}
