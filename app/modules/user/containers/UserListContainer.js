import React from 'react'
import {autobind} from 'core-decorators'
import {connect} from 'react-redux'
import EntityList from 'components/EntityList'
import OsnovaListContainer from 'components/OsnovaListContainer'
import {mapAct, mapListStateToProps} from 'utils/Util'


const entity = 'user'
const variation = '1'

@connect(mapListStateToProps(entity, variation), mapAct(entity, variation))
@autobind
export default class UserListContainer extends OsnovaListContainer {
  render() {
    return (<EntityList
      toolbarTitle='Users'
      columns={[{
        property: 'email',
        header: {
          label: 'email',
        }
      }]}
      {...this.props}
      {...(this.addProps())}
    />)
  }
}
