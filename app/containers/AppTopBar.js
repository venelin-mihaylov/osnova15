"use strict"
import React from "react"
import AppBar from "material-ui/AppBar"
import FlatButton from "material-ui/FlatButton"
import {connect} from "react-redux"
import {push} from "react-router-redux"
import ActionType from 'constants/ActionType'
import RaisedButton from 'material-ui/RaisedButton'
import {ToolbarGroup} from 'material-ui/Toolbar'

const AppTopBar = ({
  dispatch,
  user: {
    authenticated
  }
}) => (
  <AppBar
    title="TCS"
    iconElementRight={
      <div>
        <ToolbarGroup firstChild={true}>
          Leave match
          <RaisedButton label="Test"/>
          {authenticated ?
            <RaisedButton label="Logout" onClick={() => dispatch({type: ActionType.LOGOUT_USER_REQUESTED})}/> :
            <RaisedButton label="Login" onClick={() => dispatch(push('/login'))}/>
          }
        </ToolbarGroup>


      </div>
    }
    onLeftIconButtonTouchTap={() => dispatch({type: ActionType.TOGGLE_LEFT_NAV})}
  >

  </AppBar>
)

AppTopBar.propTypes = {
  user: React.PropTypes.object,
  dispatch: React.PropTypes.func
}

export default connect((state) => {
  return {
    user: state.user
  }
})(AppTopBar)
