import React from 'react'
import {connect} from 'react-redux'
import {autobind} from 'core-decorators'
import EntityFormWrapper from 'components/EntityFormWrapper'
import TargetFormFields from 'modules/target/components/TargetFormFields'
import OsnovaFormContainer from 'components/OsnovaFormContainer.js'
import {mapAct, mapCrudStateToProps, rrfModel} from 'utils/Util'
import get from 'lodash/get'

const entity = 'target'
const variation = '1'

@connect(mapCrudStateToProps(entity, variation, state => ({
  model: get(state, rrfModel(entity))
})), mapAct(entity, variation))
@autobind
class TargetFormContainer extends OsnovaFormContainer {
  render() {
    return (<EntityFormWrapper
      FormFieldsComponent={TargetFormFields}
      {...this.props}
      {...(this.addProps())}
    />)
  }
}
export default TargetFormContainer
