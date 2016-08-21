import React from 'react'
import {autobind} from 'core-decorators'
import {connect} from 'react-redux'
import EntityList from 'components/EntityList'
import OsnovaListContainer from 'components/OsnovaListContainer'

@connect(state => ({redux: state.exercise}))
@autobind
export default class ExerciseListContainer extends OsnovaListContainer {

  static entity = 'exercise'

  render() {
    return (<EntityList
      toolbarTitle='Exercises'
      columns={[{
        header: {
          label: 'id'
        },
        cell: {
          property: 'id'
        }
      }, {
        header: {
          label: 'name'
        },
        cell: {
          property: 'name'
        }
      }]}
      {...this.props}
      {...(this.addProps())}
    />)
  }
}