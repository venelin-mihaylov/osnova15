"use strict"
import React from "react"
import {connect} from "react-redux"
import {autobind} from "core-decorators"
import EntityEdit from "components/EntityEdit"
import TournamentFormFields from "modules/tournament/components/TournamentFormFields"
import OsnovaEditContainer from 'components/OsnovaEditContainer'

@connect(state => ({
  redux: state.tournament,
  form: state.tournamentForm
}))
@autobind
class TournamentEditContainer extends OsnovaEditContainer {

  static entity = 'tournament'

  render() {
    return (<EntityEdit
      FormFieldsComponent={TournamentFormFields}
      {...this.props}
      {...(this.addProps())}
    />)
  }
}
export default TournamentEditContainer
