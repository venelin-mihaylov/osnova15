import React from 'react'
import {autobind} from 'core-decorators'
import {connect} from 'react-redux'
import EntityList from 'components/EntityList'
import OsnovaListContainer from 'components/OsnovaListContainer'
import {mapAct, mapListStateToProps} from 'utils/Util'
import {edit} from 'reactabular'

const entity = 'matchExerciseTargetZone'
const variation = '1'

@connect(mapListStateToProps(entity, variation), mapAct(entity, variation))
@autobind
export default class MatchExerciseTargetNodeListContainer extends OsnovaListContainer {
  render() {

    const editable = edit.edit({
      isEditing: ({columnIndex, rowData}) => columnIndex === rowData.editing,
      onActivate: ({columnIndex, rowData}) => {
        this.props.editRow(columnIndex, rowData.id)
      },
      onValue: ({value, rowData, property}) => {
        this.props.confirmEdit(property, value, rowData.id)
      }
    })

    return (<EntityList
      toolbarTitle='MatchExerciseTargetNodes'
      columns={[{
        property: 'id',
        width: 200,
        header: {
          label: 'id',
          property: 'id',
          transforms: [sortable]
        },
      }, {
        property: 'weight',
        width: 100,
        header: {
          label: 'name',
          property: 'name',
          transforms: [sortable]
        },
      }, {
        property: 'score',
        width: 100,
        header: {
          label: 'score',
          property: 'score',
          transforms: [sortable]
        },
      }]}
      {...this.props}
      {...(this.addProps())}
    />)
  }
}
