import React from "react"
import {autobind} from "core-decorators"
import {connect} from "react-redux"
import EntityList from "components/EntityList"
import HasSelectionHOC from 'hoc/HasSelectionHOC'
import OsnovaListContainer from 'components/OsnovaListContainer'

@connect(state => ({redux: state.target}))
@autobind
export default class TargetListContainer extends OsnovaListContainer {

  static entity = 'target'

  baseListParams() {
    if (this.props.route.matchView) {
      return {
        filter: {
          matchId: this.props.params.matchId
        }
      }
    }
    return {}
  }

  render() {
    const {
      route: {
        matchView
      }
    } = this.props

    return (<EntityList
      toolbarShow={!matchView}
      toolbarTitle='Targets'
      columns={[{
        header: {
          label: 'id'
        },
        cell: {
          property: 'id'
        }
      }, {
        header: {
          label: 'name'
        },
        cell: {
          property: 'name'
        }
      }]}
      {...this.props}
      {...(this.addProps())}
    />)
  }
}
