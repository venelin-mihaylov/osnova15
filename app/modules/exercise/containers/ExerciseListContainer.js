import React from 'react'
import {autobind} from 'core-decorators'
import {connect} from 'react-redux'
import EntityList from 'components/EntityList'
import OsnovaListContainer from 'components/OsnovaListContainer'
import ExerciseSchema from '../../../../universal/model/schema/ExerciseSchema'
import TargetSchema from '../../../../universal/model/schema/TargetSchema'
import ExerciseTargetSchema from '../../../../universal/model/schema/ExerciseTargetSchema'
import {mapAct, mapListStateToProps, formatEnum, formatEnum2} from 'utils/Util'
import {Button, Icon} from 'semantic-ui-react'
import {push} from 'react-router-redux'

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

  render() {
    const {
      location: {pathname},
      redux: {selectedId}
    } = this.props

    const btnDownloadBriefing = (<Button
      disabled={!this.props.redux.selectedId}
      color='brown'
      icon='book'
      content='Briefing'
      onClick={() => this.props.redux.selectedId && window.open(`/api/download/exercise-briefing/${this.props.redux.selectedId}`)}
    />)

    const btnEditZones = (<Button
      key='zones'
      icon='edit'
      content='Zones'
      color='olive'
      disabled={!this.props.redux.selectedId}
      onClick={() => this.props.dispatch(push(`${pathname}/${selectedId}/zones`))}
    />)

    return (<EntityList
      toolbarTitle='Exercises'
      toolbarProps={{
        appendButtons: [
          btnDownloadBriefing,
          btnEditZones
        ]
      }}
      columns={[{
        property: 'favourite',
        props: {
          style: {
            width: 20
          }
        },
        header: {
          label: 'Fav'
        },
        cell: {
          format: v => v && <Icon name='heart' size='large' />
        }
      }, {
        property: 'name',
        header: {
          label: 'name'
        }
      }, {
        property: 'type',
        props: {
          style: {
            width: 100
          }
        },
        header: {
          label: 'Type'
        },
        cell: {
          format: formatEnum(ExerciseSchema)
        }
      }, {
        property: 'minShots',
        props: {
          style: {
            width: 20
          }
        },
        header: {
          label: '#Shots'
        }
      }, {
        property: 'module',
        props: {
          style: {
            width: 100
          }
        },
        header: {
          label: 'Module'
        },
        cell: {
          format: formatEnum(ExerciseSchema)
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

      }]}
      {...this.props}
      {...(this.addProps())}
    />)
  }
}
