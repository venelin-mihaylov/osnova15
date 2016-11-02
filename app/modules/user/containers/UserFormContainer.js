import React from 'react'
import {connect} from 'react-redux'
import {autobind} from 'core-decorators'
import EntityFormWrapper from 'components/EntityFormWrapper'
import OsnovaFormContainer from 'components/OsnovaFormContainer'
import {mapAct, mapCrudStateToProps, rrfSetValid2} from 'utils/Util'
import UserFormFields from 'modules/user/components/UserFormFields'

const entity = 'user'
const variation = '1'

@connect(mapCrudStateToProps(entity, variation), mapAct(entity, variation))
@autobind
class UserFormContainer extends OsnovaFormContainer {

  static entity = entity
  static variation = variation

  render() {
    return (<EntityFormWrapper
      FormFieldsComponent={UserFormFields}
      {...this.props}
      {...(this.addProps())}
    />)
  }
}
export default UserFormContainer
