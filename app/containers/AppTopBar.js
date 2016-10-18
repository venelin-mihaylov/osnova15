import React from 'react'
import AppBar from 'material-ui/AppBar'
import Act from 'constants/Act'
import {Button} from 'semantic-ui-react'
import {ToolbarGroup} from 'material-ui/Toolbar'

const AppTopBar = ({
  dispatch,
  onLeaveMatch,
  onClickLogin,
  onClickLogout,
  activeMatchId,
  user: {
    authenticated
  }
}) => (<AppBar
  title='TCS'
  iconElementRight={
    <div>
      <ToolbarGroup firstChild>
        {activeMatchId && <Button
          content='Leave Match'
          color='black'
          icon='upload'
          onClick={onLeaveMatch}
        />}
        {authenticated ?
          <Button
            negative
            content='Logout'
            icon='sign out'
            onClick={onClickLogout}
          />
            :
          <Button
            color='black'
            content='Login'
            icon='sign in'
            onClick={onClickLogin}
          />}
      </ToolbarGroup>
    </div>
  }
  onLeftIconButtonTouchTap={() => dispatch({type: Act.TOGGLE_LEFT_NAV})}
/>)

AppTopBar.propTypes = {
  onClickLogin: React.PropTypes.func,
  onClickLogout: React.PropTypes.func,
  onLeaveMatch: React.PropTypes.func,
  activeMatchId: React.PropTypes.number,
  user: React.PropTypes.object,
  dispatch: React.PropTypes.func
}

export default AppTopBar
