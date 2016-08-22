import React from 'react'
import {connect} from 'react-redux'
import {autobind} from 'core-decorators'
import EntityFormWrapper from 'components/EntityFormWrapper'
import MatchFormFields from 'modules/match/components/MatchFormFields'
import OsnovaFormContainer from 'components/OsnovaFormContainer'

@connect(state => ({
  redux: state.match
}))
@autobind
class MatchFormContainer extends OsnovaFormContainer {

  static entity = 'match'

  render() {
    return (<EntityFormWrapper
      FormFieldsComponent={MatchFormFields}
      {...this.props}
      {...(this.addProps())}
    />)
  }
}
export default MatchFormContainer
