"use strict"
import React from "react"
import {connect} from "react-redux"
import {autobind} from "core-decorators"
import EntityAdd from "components/EntityAdd"
import TournamentFormFields from "modules/tournament/components/TournamentFormFields"
import AddContainerHOC from 'hoc/AddContainerHOC'

@connect(state => ({
  redux: state.tournament,
  form: state.tournamentForm
}))
@autobind
@AddContainerHOC({
  entity: 'tournament'
})
class TournamentAddContainer extends React.Component {

  render() {
    return (<EntityAdd
      FormFieldsComponent={TournamentFormFields}
      {...this.props}
    />)
  }
}
export default TournamentAddContainer

