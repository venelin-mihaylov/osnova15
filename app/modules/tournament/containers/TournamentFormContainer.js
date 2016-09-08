import React from 'react'
import {connect} from 'react-redux'
import {autobind} from 'core-decorators'
import EntityFormWrapper from 'components/EntityFormWrapper'
import OsnovaFormContainer from 'components/OsnovaFormContainer'
import TournamentFormFields from 'modules/tournament/components/TournamentFormFields'
import {mapAct, mapCrudStateToProps} from 'utils/Util'

const entity = 'tournament'
const variation = '1'

@connect(mapCrudStateToProps(entity, variation), mapAct(entity, variation))
@autobind
class TournamentFormContainer extends OsnovaFormContainer {

  render() {
    return (<EntityFormWrapper
      FormFieldsComponent={TournamentFormFields}
      {...this.props}
      {...(this.addProps())}
    />)
  }
}
export default TournamentFormContainer
