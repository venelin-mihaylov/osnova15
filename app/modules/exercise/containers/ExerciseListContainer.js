import React from 'react'
import {autobind} from 'core-decorators'
import {connect} from 'react-redux'
import EntityList from 'components/EntityList'
import OsnovaListContainer from 'components/OsnovaListContainer'
import ExerciseSchema from '../../../../universal/model/schema/ExerciseSchema'
import {mapAct, mapListStateToProps, formatEnum} from 'utils/Util'
import {Icon} from 'stardust'

const entity = 'exercise'
const variation = '1'

@connect(mapListStateToProps(entity, variation), mapAct(entity, variation))
@autobind
export default class ExerciseListContainer extends OsnovaListContainer {
  render() {
    return (<EntityList
      toolbarTitle='Exercises'
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
        header: {
          label: 'Targets'
        },
        cell: {
          format: (targets) => {
            if (!targets) return null
            return targets.map(t => <div>{t.distance} - {t.weight} - {t.score}</div>)
          }
        }
      }]}
      {...this.props}
      {...(this.addProps())}
    />)
  }
}
