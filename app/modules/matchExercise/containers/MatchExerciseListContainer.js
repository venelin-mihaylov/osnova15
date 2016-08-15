"use strict"
import React from "react"
import {autobind} from "core-decorators"
import {connect} from "react-redux"
import EntityList from "components/EntityList"
import HasSelectionHOC from 'hoc/HasSelectionHOC'
import OsnovaListContainer from 'components/OsnovaListContainer'
import FKSelect from 'components/FKSelect'
import CRUDAct from 'constants/CRUDAct'
import axios from 'axios'

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
    const addProps = this.addProps()
    const {promiseAct} = addProps
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
            axios({
              url: '/api/exercise/misc/createFavouriteExerciseForMatch',
              method: 'post',
              data: record
            }).then(() => {
              dispatch(promiseAct(CRUDAct.LIST_REQUESTED, this.baseListParams()))
            }).catch(err => {
              console.log(err)
            })
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
        header: {
          label: 'id',
          props: {
            style: {
              width: 200
            }
          }
        },
        cell: {
          property: 'id'
        }
      }, {
        header: {
          label: 'Exercise',
          props: {
            style: {
              width: 'calc(100% - 200px)'
            }
          }
        },
        cell: {
          property: 'exercise',
          format: ({name}) => name
        }
      }]}
      {...this.props}
      {...addProps}
    />
  }
}
