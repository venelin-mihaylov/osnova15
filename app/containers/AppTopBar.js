"use strict";
import React from "react";
import AppBar from "material-ui/AppBar";
import FlatButton from "material-ui/FlatButton";
import {connect} from "react-redux";
import {push} from "react-router-redux";

const AppTopBar = props => {
  var btnLoginOrLogout = null;
  if (props.user.authenticated) {
    btnLoginOrLogout = <FlatButton label="Logout" onClick={() => props.dispatch(UserAction.logOut())}/>;
  } else {
    btnLoginOrLogout = <FlatButton label="Login" onClick={() => props.dispatch(push('/login'))}/>;
  }
  return (<AppBar title="TCS"
                  iconElementRight={btnLoginOrLogout}
                  onLeftIconButtonTouchTap={(event) => console.log(event)}
    />);
};

AppTopBar.propTypes = {
  user: React.PropTypes.object,
  dispatch: React.PropTypes.func
};

export default connect((state) => {
  return {
    user: state.user
  }
})(AppTopBar);
