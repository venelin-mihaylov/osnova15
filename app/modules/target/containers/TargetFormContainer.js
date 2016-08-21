import React from 'react'
import {connect} from 'react-redux'
import {autobind} from 'core-decorators'
import EntityFormWrapper from 'components/EntityFormWrapper'
import TargetFormFields from 'modules/target/components/TargetFormFields'
import OsnovaFormContainer from 'components/OsnovaFormContainer.js'

@connect(state => ({
  redux: state.target,
  model: state.targetModel
}))
@autobind
class TargetFormContainer extends OsnovaFormContainer {
  static entity = 'target'

  render() {
    return (<EntityFormWrapper
      FormFieldsComponent={TargetFormFields}
      {...this.props}
      {...(this.addProps())}
    />)
  }
}
export default TargetFormContainer
