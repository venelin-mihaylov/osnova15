import React from 'react'
import {connect} from 'react-redux'
import {autobind} from 'core-decorators'
import EntityFormWrapper from 'components/EntityFormWrapper'
import OsnovaFormContainer from 'components/OsnovaFormContainer'
import {mapAct, mapCrudStateToProps, rrfSetValid2} from 'utils/Util'
import CompetitorFormFields from 'modules/competitor/components/CompetitorFormFields'

const entity = 'competitor'
const variation = '1'

@connect(mapCrudStateToProps(entity, variation), mapAct(entity, variation))
@autobind
class CompetitorFormContainer extends OsnovaFormContainer {

  static entity = entity
  static variation = variation

  postLoadModel() {
    rrfSetValid2({
      dispatch: this.props.dispatch,
      entity: this.props.entity,
      additionalFields: 'country'
    })
  }


  render() {
    return (<EntityFormWrapper
      FormFieldsComponent={CompetitorFormFields}
      {...this.props}
      {...(this.addProps())}
    />)
  }
}
export default CompetitorFormContainer
