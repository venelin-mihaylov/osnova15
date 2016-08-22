import React from 'react'
import {autobind} from 'core-decorators'
import {connect} from 'react-redux'
import EntityList from 'components/EntityList'
import OsnovaListContainer from 'components/OsnovaListContainer'

@connect(state => ({redux: state.matchCompetitor}))
@autobind
export default class MatchCompetitorListContainer extends OsnovaListContainer {

  static entity = 'matchCompetitor'

  baseListParams() {
    return {
      filter: {
        matchId: {
          operator: '=',
          value: this.props.params.matchId
        }
      }
    }
  }

  render() {
    return (<EntityList
      toolbarTitle='MatchCompetitors'
      columns={[{
        property: 'id',
        header: {
          label: 'id'
        }
      }, {
        property: 'competitor',
        header: {
          label: 'competitor'
        },
        cell: {
          format: ({firstName, lastName}) => `${firstName} ${lastName}`
        }
      }, {
        property: 'disqualified',
        header: {
          label: 'disqualified'
        },
        cell: {
          format: (v) => (v ? 'Yes' : 'No')
        }
      }]}
      {...this.props}
      {...(this.addProps())}
    />)
  }
}
