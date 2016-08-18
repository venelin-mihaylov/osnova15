import React from 'react'
import AppBar from 'material-ui/AppBar'
import {connect} from 'react-redux'
import {push} from 'react-router-redux'
import Act from 'constants/Act'
import RaisedButton from 'material-ui/RaisedButton'
import {ToolbarGroup} from 'material-ui/Toolbar'
import FontIcon from 'material-ui/FontIcon'

const AppTopBar = ({
  dispatch,
  onLeaveMatch,
  activeMatchId,
  user: {
    authenticated
  }
}) => (<AppBar
  title='TCS'
  iconElementRight={
    <div>
      <ToolbarGroup firstChild>
        {activeMatchId && <RaisedButton
          label={`Match: ${activeMatchId}`}
          labelPosition='before'
          icon={<FontIcon className='fa fa-upload' />}
          onClick={onLeaveMatch}
        />}
        {authenticated ?
          <RaisedButton
            label='Logout'
            labelPosition='before'
            icon={<FontIcon className='fa fa-sign-out' />}
            onClick={() => dispatch({type: Act.LOGOUT_USER_REQUESTED})}
          />
          :
          <RaisedButton
            label='Login'
            labelPosition='before'
            onClick={() => dispatch(push('/login'))}
            icon={<FontIcon className='fa fa-sign-in' />}
          />
        }
      </ToolbarGroup>
    </div>
  }
  onLeftIconButtonTouchTap={() => dispatch({type: Act.TOGGLE_LEFT_NAV})}
/>)

AppTopBar.propTypes = {
  onLeaveMatch: React.PropTypes.func,
  activeMatchId: React.PropTypes.number,
  user: React.PropTypes.object,
  dispatch: React.PropTypes.func
}

export default connect((state) => ({user: state.user}))(AppTopBar)
