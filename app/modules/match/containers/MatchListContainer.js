import React from 'react'
import {autobind} from 'core-decorators'
import {connect} from 'react-redux'
import EntityList from 'components/EntityList'
import OsnovaListContainer from 'components/OsnovaListContainer'
import {Menu} from 'semantic-ui-react'
import Act from 'constants/Act'
import {mapAct, mapListStateToProps, formatDate, formatEnum, formatCountry} from 'utils/Util'
import MatchSchema from '../../../../universal/model/schema/MatchSchema'
import {push} from 'react-router-redux'
import cx from 'classnames'

const entity = 'match'
const variation = '1'

@connect(mapListStateToProps(entity, variation, s => ({nav: s.nav})), mapAct(entity, variation))
@autobind
export default class MatchListContainer extends OsnovaListContainer {

  render() {
    const {
      dispatch,
      redux: {
        selectedId
      },
      nav: {
        activeMatchId
      }
    } = this.props

    return (<EntityList
      toolbarTitle='Matches'
      toolbarProps={{
        appendButtons: !activeMatchId &&
          <Menu.Item
            icon='download'
            content='Enter'
            className={cx({disabled: !selectedId})}
            onClick={() => {
              dispatch({type: Act.ENTER_MATCH, matchId: selectedId})
              dispatch(push(`/match/${selectedId}/view`))
            }}
          />
      }}
      columns={[{
        property: 'id',
        header: {
          label: 'id'
        },
        props: {
          width: 20
        }
      }, {
        property: 'country',
        header: {
          label: 'Country'
        },
        cell: {
          format: formatCountry
        },
        props: {
          width: 200
        },
      }, {
        property: 'name',
        header: {
          label: 'name'
        },
        props: {
          width: 200
        },
      }, {
        property: 'discipline',
        header: {
          label: 'discipline'
        },
        cell: {
          format: formatEnum(MatchSchema)
        },
        props: {
          width: 200
        },
      }, {
        property: 'type',
        header: {
          label: 'type'
        },
        cell: {
          format: formatEnum(MatchSchema)
        },
        props: {
          width: 150
        },
      }, {
        property: 'startDate',
        header: {
          label: 'Start date'
        },
        cell: {
          format: formatDate
        },
        props: {
          width: 120
        },
      }, {
        property: 'endDate',
        header: {
          label: 'End date'
        },
        cell: {
          format: formatDate
        },
        props: {
          width: 120
        },
      }, {
        property: 'rangeMaster',
        header: {
          label: 'Masters'
        },
        cell: {
          property: 'rangeMaster',
          format: (v, {rowData}) => (<div>
            <div>rangeMaster: {rowData.rangeMaster || 'N/A'}</div>
            <div>statMaster: {rowData.statMaster || 'N/A'}</div>
            <div>matchDirector: {rowData.matchDirector || 'N/A'}</div>
          </div>)
        }
      }, {
        property: 'tournamentId__name',
        header: {
          label: 'Tournament'
        },
        props: {
          width: 200
        },
      }]}
      {...this.props}
      {...(this.addProps())}
    />)
  }
}
