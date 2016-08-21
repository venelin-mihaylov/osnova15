import React from 'react'
import {autobind} from 'core-decorators'
import {connect} from 'react-redux'
import EntityList from 'components/EntityList'
import CRUDAct from 'constants/CRUDAct'
import OsnovaListContainer from 'components/OsnovaListContainer'

@connect(state => ({redux: state.tournament}))
@autobind
export default class TournamentListContainer extends OsnovaListContainer {

  static entity = 'tournament'

  constructor(props) {
    super(props)
    this.act = CRUDAct.act(this.constructor.entity)
  }

  componentWillMount() {
    this.props.dispatch(this.act(CRUDAct.LIST_REQUESTED))
  }

  render() {
    return (<EntityList
      columns={[{
        property: 'id',
        width: 200,
        header: {
          label: 'id',
          property: 'id'
        },
        cell: {
          property: 'id'
        }
      }, {
        property: 'name',
        width: 800,
        header: {
          label: 'name',
          property: 'name'
        },
        cell: {
          property: 'name'
        }
      }]}
      toolbarTitle='Tournaments'
      {...this.props}
      {...this.addProps()}
    />)
  }
}
