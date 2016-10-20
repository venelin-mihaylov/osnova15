import React from 'react'
import {connect} from 'react-redux'
import {autobind} from 'core-decorators'
import EntityFormWrapper from 'components/EntityFormWrapper'
import MatchFormFields from 'modules/match/components/MatchFormFields'
import OsnovaFormContainer from 'components/OsnovaFormContainer'
import {mapAct, mapCrudStateToProps, rrfSetValid, rrfSetValid2} from 'utils/Util'
import MatchSchema from '../../../../universal/model/schema/MatchSchema'

const entity = 'match'
const variation = '1'

@connect(mapCrudStateToProps(entity, variation), mapAct(entity, variation))
@autobind
class MatchFormContainer extends OsnovaFormContainer {

  postLoadModel() {
    rrfSetValid2({
      dispatch: this.props.dispatch,
      entity: this.props.entity,
      schema: MatchSchema,
      additionalFields: ['tournamentId', 'country']
    })
  }

  render() {
    return (<EntityFormWrapper
      FormFieldsComponent={MatchFormFields}
      {...this.props}
      {...(this.addProps())}
    />)
  }
}
export default MatchFormContainer
