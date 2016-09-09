import React from 'react'
import {autobind} from 'core-decorators'
import {connect} from 'react-redux'
import EntityList from 'components/EntityList'
import OsnovaListContainer from 'components/OsnovaListContainer'
import {Button, Icon} from 'stardust'
import Act from 'constants/Act'
import {mapAct, mapListStateToProps} from 'utils/Util'
import curry from 'lodash/curry'
import ListSort from 'utils/ListSort'

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
      }, {
        property: 'name',
        header: {
          label: 'name'
        },
      }, {
        property: 'tournamentId__name',
        header: {
          label: 'Tournament'
        }
      }]}
      {...this.props}
      {...(this.addProps())}
    />)
  }
}
