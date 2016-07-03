"use strict"
import React from "react"
import {connect} from "react-redux"
import {autobind} from "core-decorators"
import EntityAdd from "components/EntityAdd"
import TournamentFormFields from "modules/tournament/components/TournamentFormFields"
import OsnovaAddContainer from 'components/OsnovaAddContainer'

@connect(state => ({
  redux: state.tournament,
  form: state.tournamentForm
}))
@autobind
class TournamentAddContainer extends OsnovaAddContainer {

  static entity = 'tournament'

  render() {
    return (<EntityAdd
      FormFieldsComponent={TournamentFormFields}
      {...this.props}
      {...(this.addProps())}
    />)
  }
}
export default TournamentAddContainer

