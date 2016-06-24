"use strict"
import React from "react"
import {connect} from "react-redux"
import {autobind} from "core-decorators"
import EntityEdit from "components/EntityEdit"
import TournamentFormFields from "modules/tournament/components/TournamentFormFields"
import EditContainerHOC from 'hoc/EditContainerHOC'

@connect(state => ({
  redux: state.tournament,
  form: state.tournamentForm
}))
@autobind
@EditContainerHOC('tournament')
class TournamentEditContainer extends React.Component {
  render() {
    return (<EntityEdit
      FormFieldsComponent={TournamentFormFields}
      {...this.props}
    />)
  }
}
export default TournamentEditContainer
