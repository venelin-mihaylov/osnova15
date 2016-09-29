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
import {Button, Icon} from 'stardust'
import cx from 'classnames'
import {push} from 'react-router-redux'

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
    const {
      dispatch,
      location: {pathname},
      redux: {selectedId}
    } = this.props
    return (<EntityList
      toolbarTitle='Match Exercises'
      toolbarProps={{
        appendButtons: [
          <Button
            key='zones'
            className={cx({
              positive: true,
              icon: true,
              labeled: true,
            })}
            onClick={() => dispatch(push(`${pathname}/${selectedId}/zones`))}
          >
            <Icon name='edit' />
            Zones
          </Button>,
          <FKSelect
            key='addFavouriteExercise'
            entity='exercise'
            variation='1'
            labelField='name'
            onChange={this.onSelectFavouriteExercise}
            listParams={{
              filter: {
                favourite: true
              }
            }}
          />
        ]
      }}
      columns={[{
        property: 'id',
        header: {
          label: 'id',
        },
        props: {
          width: 50
        }
      }, {
        property: 'name',
        header: {
          label: 'Exercise',
        },
        props: {
          width: 150
        }
      }, {
        property: 'minShots',
        header: {
          label: 'Min. shots'
        },
        props: {
          width: 50
        }
      }, {
        property: 'type',
        header: {
          label: 'Type'
        },
        cell: {
          format: formatEnum(ExerciseSchema)
        },
        props: {
          width: 100
        }
      }, {
        property: 'module',
        header: {
          label: 'Module'
        },
        cell: {
          format: formatEnum(ExerciseSchema)
        },
        props: {
          width: 100
        }
      }, {
        property: 'rangeOfficer',
        header: {
          label: 'Range Officer'
        },
        props: {
          width: 200
        }
      }, {
        property: 'exercise_target',
        header: 'Targets',
        cell: {
          format: (rs) => (<div>
            {rs && rs.map(r => <div>
              {r.targetId} - {r.match_exercise_target_zone[0].targetName} - Distance: {r.match_exercise_target_zone[0].distance}
              {r.match_exercise_target_zone.map(z => (<div>
                {z.zoneName} - {z.weight} - {z.score}
              </div>))}
            </div>)}
          </div>)
        }

      }]}
      {...this.props}
      {...(this.addProps())}
    />)
  }
}
