import React from 'react'
import {connect} from 'react-redux'
import {autobind} from 'core-decorators'
import CRUDActionType from 'constants/CRUDActionType'
import HasSelectionHOC from 'hoc/HasSelectionHOC'
import ListContainerHOC from 'hoc/ListContainerHOC'
import EntityList from 'components/EntityList'

@connect(state => ({
  redux: state.matchCompetitor,
  nav: state.nav
}))
@autobind
@HasSelectionHOC('redux.listRecords')
@ListContainerHOC('matchCompetitor')
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
        name: 'name',
        title: 'Име'
      }, {
        name: 'startDate',
        title: 'Стартиращ на'
      }]}
      {...this.props}
    />
  }

}