import React from 'react'
import {autobind} from 'core-decorators'
import {connect} from 'react-redux'
import EntityList from 'components/EntityList'
import OsnovaListContainer from 'components/OsnovaListContainer'
import ExerciseSchema from '../../../../universal/model/schema/ExerciseSchema'
import {mapAct, mapListStateToProps, formatEnum, formatBool} from 'utils/Util'

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
        header: {
          label: 'favourite'
        },
        cell: {
          format: formatBool
        }
      }, {
        property: 'name',
        header: {
          label: 'name'
        }
      }, {
        property: 'type',
        header: {
          label: 'Type'
        },
        cell: {
          format: formatEnum(ExerciseSchema, 'type')
        }
      }, {
        property: 'minShots',
        header: {
          label: 'Min shots'
        }
      }, {
        property: 'module',
        header: {
          label: 'module'
        },
        cell: {
          format: formatEnum(ExerciseSchema, 'module')
        }
      }, {
        property: 'exercise_target',
        header: {
          label: 'Targets'
        },
        cell: {
          format: (v) => {
            console.log(v)
            return 'Targets ...'
          }
        }


      }]}
      {...this.props}
      {...(this.addProps())}
    />)
  }
}
