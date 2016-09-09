import React from 'react'
import {autobind} from 'core-decorators'
import {connect} from 'react-redux'
import EntityList from 'components/EntityList'
import OsnovaListContainer from 'components/OsnovaListContainer'
import FKSelect from 'components/FKSelect'
import FKAct from 'constants/FKAct'
import CRUDAct from 'constants/CRUDAct'
import axios from 'axios'
import {mapAct, mapListStateToProps, act} from 'utils/Util'

const entity = 'matchExercise'
const variation = '1'
@connect(mapListStateToProps(entity, variation), mapAct(entity, variation))
@autobind
export default class MatchExerciseListContainer extends OsnovaListContainer {
  componentWillMount() {
    this.props.act(CRUDAct.LIST_SET_BASE_FILTER, {
      value: {
        matchId: {
          operator: '=',
          value: this.props.params.matchId
        }
      }
    })
    super.componentWillMount()
  }

  onSelectFavouriteExercise(exerciseId) {
    const {
      dispatch,
      promiseAct,
      params: {
        matchId
      }
    } = this.props
    dispatch(act('exercise', '1', FKAct.FK_RESET))
    const record = {matchId, exerciseId}
    axios({
      url: '/api/exercise/misc/createFavouriteExerciseForMatch',
      method: 'post',
      data: record
    }).then(() => promiseAct(CRUDAct.LIST_REQUESTED))
      .catch(err => console.log(err))
  }

  render() {
    return (<EntityList
      toolbarTitle='MatchExercises'
      toolbarProps={{
        appendButtons: [<FKSelect
          key='addFavouriteExercise'
          entity='exercise'
          variation='1'
          labelField='name'
          hintText='Add exercise'
          onChange={this.onSelectFavouriteExercise}
          listParams={{
            filter: {
              favourite: true,
              belongsToMatch: {
                operator: '=',
                value: this.props.params.matchId
              }
            }
          }}
        />]
      }}
      columns={[{
        property: 'id',
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
        property: 'exercise',
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
      {...(this.addProps())}
    />)
  }
}
