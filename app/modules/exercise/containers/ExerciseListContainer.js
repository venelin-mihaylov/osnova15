import React from 'react'
import {autobind} from 'core-decorators'
import {connect} from 'react-redux'
import EntityList from 'components/EntityList'
import OsnovaListContainer from 'components/OsnovaListContainer'
import ExerciseSchema from '../../../../universal/model/schema/ExerciseSchema'
import TargetSchema from '../../../../universal/model/schema/TargetSchema'
import ExerciseTargetSchema from '../../../../universal/model/schema/ExerciseTargetSchema'
import {mapAct, mapListStateToProps, act, formatEnum, formatEnum2} from 'utils/Util'
import {Button, Icon} from 'semantic-ui-react'
import {push} from 'react-router-redux'
import FKSelect from 'components/FKSelect'
import CRUDAct from 'constants/CRUDAct'
import FKAct from 'constants/FKAct'
import axios from 'axios'

const entity = 'exercise'
const variation = '1'

@connect(mapListStateToProps(entity, variation), mapAct(entity, variation))
@autobind
export default class ExerciseListContainer extends OsnovaListContainer {

  baseFilter() {
    return {
      favourite: true
    }
  }

  isMatchView() {
    return !!this.props.params.matchId
  }

  isGlobalView() {
    return !this.isMatchView()
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

  appendButtons() {
    const {
      dispatch,
      location: {pathname},
      redux: {selectedId},
    } = this.props

    const btnDownloadBriefing = (<Button
      disabled={!selectedId}
      color='brown'
      icon='book'
      content='Briefing'
      onClick={() => selectedId && window.open(`/api/download/exercise-briefing/${selectedId}`)}
    />)

    const btnEditZones = (<Button
      key='zones'
      icon='edit'
      content='Zones'
      color='olive'
      disabled={!selectedId}
      onClick={() => dispatch(push(`${pathname}/${selectedId}/zones`))}
    />)

    const dropdownAddFavouriteExercise = (<FKSelect
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
    />)

    if (this.isMatchView()) {
      return [
        btnDownloadBriefing,
        btnEditZones,
        dropdownAddFavouriteExercise
      ]
    }

    return [
      btnDownloadBriefing,
      btnEditZones
    ]
  }

  columns() {
    const columns = [{
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
        label: '#Shots'
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
        format: (rs = []) => (rs && <div>
          {rs.map(r => <div style={{paddingTop: '1rem'}}>
            <ul className='ui list'>
              <span>{r.target.name};</span>
              <span>type: {formatEnum2(TargetSchema, 'type', r.target.type)};</span>
              <span>distance: {r.distance} {formatEnum2(ExerciseTargetSchema, 'metric', r.metric)}</span>
              <div className='ui list'>
                {r.exercise_target_zone.map(z => (<li>
                  {z.zoneName} - weight:{z.weight} score:{z.score}
                </li>))}
              </div>
            </ul>
          </div>)}
        </div>)
      }
    }]

    if (this.isGlobalView()) {
      columns.unshift({
        property: 'favourite',
        props: {
          width: 20
        },
        header: {
          label: 'Fav'
        },
        cell: {
          format: v => v && <Icon name='heart' size='large' />
        }
      })
    }

    return columns
  }

  render() {
    return (<EntityList
      toolbarTitle='Exercises'
      toolbarProps={{
        appendButtons: this.appendButtons()
      }}
      columns={this.columns()}
      {...this.props}
      {...(this.addProps())}
    />)
  }
}
