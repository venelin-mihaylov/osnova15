"use strict";
import React from "react";
import AppBar from "material-ui/AppBar";
import FlatButton from "material-ui/FlatButton";
import {connect} from "react-redux";
import {push} from "react-router-redux";
import ActionType from 'constants/ActionType';

const AppTopBar = props => {
  const {
    dispatch,
    user: {
      authenticated
    }
  } = props;

  return (<AppBar title="TCS"
                  iconElementRight={authenticated ?
                    <FlatButton label="Logout" onClick={() => dispatch({type: ActionType.LOGOUT_USER_REQUESTED})}/> :
                    <FlatButton label="Login" onClick={() => dispatch(push('/login'))}/>
                  }
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
