"use strict"
import React from "react"
import {autobind} from "core-decorators"
import {connect} from "react-redux"
import EntityList from "components/EntityList"
import HasSelectionHOC from 'hoc/HasSelectionHOC'
import OsnovaListContainer from 'components/OsnovaListContainer'

@connect(state => ({redux: state.matchExercise}))
@autobind
@HasSelectionHOC({dataProp: 'redux.listRecords'})
export default class MatchExerciseListContainer extends OsnovaListContainer {

  static entity = 'matchExercise'

  baseListParams() {
    return {
      filter: {
        matchId: {
          operator: '=',
          value: this.props.params.matchId
        }
      }
    }
  }

  render() {
    return <EntityList
      toolbarTitle="MatchExercises"
      columns={[{
        name: 'id',
        title: 'ИД'
      }, {
        name: 'exerciseId',
        title: 'Exercise',
        render: ({data: {exercise}}) => (exercise ? `${exercise.name}` : '')
      }]}
      {...this.props}
      {...(this.addProps())}
    />
  }
}
