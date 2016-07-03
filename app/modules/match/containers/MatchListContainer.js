"use strict"
import React from "react"
import {autobind} from "core-decorators"
import {connect} from "react-redux"
import EntityList from "components/EntityList"
import HasSelectionHOC from 'hoc/HasSelectionHOC'
import OsnovaListContainer from 'components/OsnovaListContainer'
import RaisedButton from 'material-ui/RaisedButton'
import FontIcon from 'material-ui/FontIcon'
import ActionType from 'constants/ActionType'

@connect(state => ({
  redux: state.match,
  nav: state.nav
}))
@autobind
@HasSelectionHOC('redux.listRecords')
export default class MatchListContainer extends OsnovaListContainer {

  static entity = 'match'

  render() {
    const {
      dispatch,
      withFirstSelection,
      selectedId,
      nav: {
        activeMatchId
      }
    } = this.props

    return <EntityList
      toolbarTitle="Matches"
      toolbarProps={{
        appendButtons: (activeMatchId ?
          [<RaisedButton
            key="exitMatch"
            label="Leave Match"
            primary={true}
            onClick={() => dispatch({type: ActionType.EXIT_MATCH})}
            icon={<FontIcon className="fa fa-upload"/>}
          />]
          :
          [<RaisedButton
          key="enterMatch"
          label="Enter Match"
          primary={true}
          disabled={!selectedId}
          onClick={() => withFirstSelection(r => dispatch({type: ActionType.ENTER_MATCH, matchId: r.id}))}
          icon={<FontIcon className="fa fa-download"/>}
          />])
      }}
      columns={[{
        name: 'id',
        title: 'ИД'
      }, {
        name: 'name',
        title: 'Име'
      }, {
        name: 'tournamentId__name',
        title: 'Състезание'
      }]}
      {...this.props}
      {...(this.addProps())}
    />
  }
}