"use strict"
import React from "react"
import {autobind} from "core-decorators"
import {connect} from "react-redux"
import EntityList from "components/EntityList"
import HasSelectionHOC from 'hoc/HasSelectionHOC'
import ListContainerHOC from 'hoc/ListContainerHOC'
import RaisedButton from 'material-ui/RaisedButton'
import FontIcon from 'material-ui/FontIcon'
import ActionType from 'constants/ActionType'

@connect(state => ({redux: state.match}))
@autobind
@HasSelectionHOC('redux.listRecords')
@ListContainerHOC('match')
export default class MatchListContainer extends React.Component {
  render() {
    const {
      dispatch,
      withFirstSelection
    } = this.props

    return <EntityList
      toolbarTitle="Matches"
      toolbarProps={{
        appendButtons: [<RaisedButton
          key="enterMatch"
          label="Enter Match"
          primary={true}
          onClick={() => withFirstSelection(r => {
            console.log(r)
            dispatch({type: ActionType.ENTER_MATCH, matchId: r.id})
          })}
          icon={<FontIcon className="fa fa-pencil"/>}
        />]
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
    />
  }
}