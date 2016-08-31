import React from 'react'
import {autobind} from 'core-decorators'
import {connect} from 'react-redux'
import EntityList from 'components/EntityList'
import OsnovaListContainer from 'components/OsnovaListContainer'
import {Button, Icon} from 'stardust'
import Act from 'constants/Act'

@connect(state => ({
  redux: state.match,
  nav: state.nav
}))
@autobind
export default class MatchListContainer extends OsnovaListContainer {

  static entity = 'match'

  render() {
    const {
      dispatch,
      redux: {
        listSelectedId
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
            onClick={() => dispatch({type: Act.ENTER_MATCH, matchId: listSelectedId})}
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
