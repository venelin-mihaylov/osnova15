import React from 'react'
import {connect} from 'react-redux'
import {autobind} from 'core-decorators'
import EntityFormWrapper from 'components/EntityFormWrapper'
import TournamentFormFields from 'modules/tournament/components/TournamentFormFields'
import OsnovaFormContainer from 'components/OsnovaFormContainer'

@connect(state => ({
  redux: state.tournament,
  form: state.tournamentForm
}))
@autobind
class TournamentFormContainer extends OsnovaFormContainer {
  static entity = 'tournament'

  render() {
    return (<EntityFormWrapper
      FormFieldsComponent={TournamentFormFields}
      {...this.props}
      {...(this.addProps())}
    />)
  }
}
export default TournamentFormContainer
