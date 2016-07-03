import React from 'react'
import {connect} from 'react-redux'
import {autobind} from 'core-decorators'
import CRUDActionType from 'constants/CRUDActionType'
import HasSelectionHOC from 'hoc/HasSelectionHOC'
import ListContainerHOC from 'hoc/ListContainerHOC'
import EntityList from 'components/EntityList'
import {toUri} from 'utils/Util'

@connect(state => ({
  redux: state.matchCompetitor,
  nav: state.nav
}))
@autobind
@HasSelectionHOC('redux.listRecords')
@ListContainerHOC({
  entity: 'matchCompetitor',
  uri: (props, {action, id}) => toUri(['match', props.params.matchId, 'competitor', id, action])
})
export default class MatchCompetitorListContainer extends React.Component {

  componentWillMount() {
    this.props.dispatch(this.props.act(CRUDActionType.LIST_REQUESTED, {
      filter: {
        matchId: this.props.params.matchId
      }
    }))
  }

  render() {
    return <EntityList
      toolbarTitle="Competitors"
      columns={[{
        name: 'id',
        title: 'ИД'
      }, {
        name: 'competitorId',
        title: 'Състезател ИД'
      }, {
        name: 'disqualified',
        title: 'Дисквалифициран'
      }]}
      {...this.props}
    />
  }

}