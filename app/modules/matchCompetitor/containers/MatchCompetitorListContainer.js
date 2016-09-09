import React from 'react'
import {autobind} from 'core-decorators'
import {connect} from 'react-redux'
import EntityList from 'components/EntityList'
import OsnovaListContainer from 'components/OsnovaListContainer'
import {mapAct, mapListStateToProps} from 'utils/Util'
import CRUDAct from 'constants/CRUDAct'


const entity = 'matchCompetitor'
const variation = '1'

@connect(mapListStateToProps(entity, variation), mapAct(entity, variation))
@autobind
export default class MatchCompetitorListContainer extends OsnovaListContainer {

  componentWillMount() {
    this.props.act(CRUDAct.LIST_SET_BASE_FILTER, {
      value: {
        matchId: {
          operator: '=',
          value: this.props.params.matchId
        }
      }
    })
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
