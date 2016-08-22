import React from 'react'
import {autobind} from 'core-decorators'
import {connect} from 'react-redux'
import EntityList from 'components/EntityList'
import OsnovaListContainer from 'components/OsnovaListContainer'

@connect(state => ({redux: state.competitor}))
@autobind
export default class CompetitorListContainer extends OsnovaListContainer {

  static entity = 'competitor'

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
