import React from 'react'
import {autobind} from 'core-decorators'
import {connect} from 'react-redux'
import EntityList from 'components/EntityList'
import OsnovaListContainer from 'components/OsnovaListContainer'
import {mapAct, mapListStateToProps} from 'utils/Util'
import {countries} from 'country-data'
import {Flag} from 'stardust'

const entity = 'competitor'
const variation = '1'

@connect(mapListStateToProps(entity, variation), mapAct(entity, variation))
@autobind
export default class CompetitorListContainer extends OsnovaListContainer {
  render() {
    return (<EntityList
      toolbarTitle='Competitors'
      columns={[{
        property: 'firstName',
        header: {
          label: 'firstName'
        },
      }, {
        property: 'country',
        header: {
          label: 'Country'
        },
        cell: {
          format: (value) => {
            if (value) {
              const c = countries[value.toUpperCase()]
              return (<span>
                <Flag name={value} />
                {c && c.name}
              </span>)
            }
            return null
          }
        }
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
