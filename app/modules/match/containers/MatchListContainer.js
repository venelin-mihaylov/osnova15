import React from 'react'
import {autobind} from 'core-decorators'
import {connect} from 'react-redux'
import EntityList from 'components/EntityList'
import OsnovaListContainer from 'components/OsnovaListContainer'
import RaisedButton from 'material-ui/RaisedButton'
import FontIcon from 'material-ui/FontIcon'
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
          [<RaisedButton
            key='exitMatch'
            label='Leave Match'
            primary
            onClick={() => dispatch({type: Act.EXIT_MATCH})}
            icon={<FontIcon className='fa fa-upload' />}
          />]
          :
          [<RaisedButton
            key='enterMatch'
            label='Enter Match'
            primary
            disabled={!listSelectedId}
            onClick={() => dispatch({type: Act.ENTER_MATCH, matchId: listSelectedId})}
            icon={<FontIcon className='fa fa-download' />}
          />])
      }}
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
      }, {
        header: {
          label: 'Tournament'
        },
        cell: {
          property: 'tournamentId__name'
        }
      }]}
      {...this.props}
      {...(this.addProps())}
    />)
  }
}
