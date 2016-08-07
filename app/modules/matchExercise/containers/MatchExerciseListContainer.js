"use strict"
import React from "react"
import {autobind} from "core-decorators"
import {connect} from "react-redux"
import EntityList from "components/EntityList"
import HasSelectionHOC from 'hoc/HasSelectionHOC'
import OsnovaListContainer from 'components/OsnovaListContainer'
import FKSelect from 'components/FKSelect'
import FKAct from 'constants/FKAct'
import CRUDAct from 'constants/CRUDAct'

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
    const {dispatch, params: {matchId}} = this.props
    return <EntityList
      toolbarTitle="MatchExercises"
      toolbarProps={{
        appendButtons: [<FKSelect
          entity="exercise"
          variation="1"
          labelField="name"
          hintText="Add exercise"
          onChange={(exerciseId) => {
            const record = {matchId, exerciseId}
            dispatch(CRUDAct.act('matchExercise')(CRUDAct.CREATE_REQUESTED, {record}))
          }}
          listParams={{
            filter: {
              favourite: true,
              belongsToMatch: {
                operator: '=',
                value: matchId
              }
            }
          }}
        />]
      }}
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
