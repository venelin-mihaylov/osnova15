import React from 'react'
import {autobind} from 'core-decorators'
import {connect} from 'react-redux'
import EntityList from 'components/EntityList'
import OsnovaListContainer from 'components/OsnovaListContainer'
import {Button, Icon} from 'stardust'
import Act from 'constants/Act'
import {mapAct, mapListStateToProps, formatDate, formatEnum, formatCountry} from 'utils/Util'
import MatchSchema from '../../../../universal/model/schema/MatchSchema'

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
        appendButtons: (activeMatchId ?
          <Button
            className='primary icon labeled'
            key='exitMatch'
            onClick={() => dispatch({type: Act.EXIT_MATCH})}
          >
            <Icon name='upload' />
            Exit
          </Button>
          :
          <Button
            className='primary icon labeled'
            key='enterMatch'
            onClick={() => dispatch({type: Act.ENTER_MATCH, matchId: selectedId})}
          >
            <Icon name='download' />
            Enter
          </Button>)
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
