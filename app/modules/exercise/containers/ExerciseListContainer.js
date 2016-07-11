"use strict"
import React from "react"
import {autobind} from "core-decorators"
import {connect} from "react-redux"
import EntityList from "components/EntityList"
import HasSelectionHOC from 'hoc/HasSelectionHOC'
import OsnovaListContainer from 'components/OsnovaListContainer'

@connect(state => ({redux: state.exercise}))
@autobind
@HasSelectionHOC({dataProp: 'redux.listRecords'})
export default class ExerciseListContainer extends OsnovaListContainer {

  static entity = 'exercise'

  render() {

    return <EntityList
      toolbarTitle="Exercises"
      columns={[{
        name: 'id',
        title: 'ИД'
      }, {
        name: 'name',
        title: 'name'
      }]}
      {...this.props}
      {...(this.addProps())}
    />
  }
}