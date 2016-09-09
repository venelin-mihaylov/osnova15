import React from 'react'
import {autobind} from 'core-decorators'
import {connect} from 'react-redux'
import EntityList from 'components/EntityList'
import OsnovaListContainer from 'components/OsnovaListContainer'
import {mapAct, mapListStateToProps} from 'utils/Util'
import curry from 'lodash/curry'
import ListSort from 'utils/ListSort'

const entity = 'exercise'
const variation = '1'

@connect(mapListStateToProps(entity, variation), mapAct(entity, variation))
@autobind
export default class ExerciseListContainer extends OsnovaListContainer {
  render() {
    return (<EntityList
      toolbarTitle='Exercises'
      columns={[{
        property: 'id',
        header: {
          label: 'id'
        }
      }, {
        property: 'name',
        header: {
          label: 'name'
        }
      }]}
      {...this.props}
      {...(this.addProps())}
    />)
  }
}
