import React from 'react'
import {autobind} from 'core-decorators'
import {connect} from 'react-redux'
import EntityList from 'components/EntityList'
import OsnovaListContainer from 'components/OsnovaListContainer'
import FKSelect from 'components/FKSelect'
import FKAct from 'constants/FKAct'
import CRUDAct from 'constants/CRUDAct'
import axios from 'axios'
import {mapAct, mapListStateToProps, act, formatEnum} from 'utils/Util'
import ExerciseSchema from '../../../../universal/model/schema/ExerciseSchema'

const entity = 'exercise'
const variation = '1'
@connect(mapListStateToProps(entity, variation), mapAct(entity, variation))
@autobind
export default class MatchExerciseListContainer extends OsnovaListContainer {
  baseFilter() {
    return {
      matchId: {
        operator: '=',
        value: this.props.params.matchId
      }
    }
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
      toolbarTitle='Match Exercises'
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
              favourite: true
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
        property: 'name',
        header: {
          label: 'Exercise',
          props: {
            style: {
              width: 'calc(100% - 200px)'
            }
          }
        }
      }, {
        property: 'minShots',
        header: {
          label: 'Min. shots'
        }
      }, {
        property: 'type',
        header: {
          label: 'Type'
        },
        cell: {
          format: formatEnum(ExerciseSchema)
        }
      }, {
        property: 'module',
        header: {
          label: 'Module'
        },
        cell: {
          format: formatEnum(ExerciseSchema)
        }
      }, {
        property: 'rangeOfficer',
        header: {
          label: 'Range Officer'
        },
      }]}
      {...this.props}
      {...(this.addProps())}
    />)
  }
}
