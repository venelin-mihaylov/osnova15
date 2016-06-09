"use strict";
import React from "react";
import {connect} from "react-redux";
import {autobind} from "core-decorators";
import UserAction from "actions/UserAction";
import LoginForm from "components/LoginForm";

//TODO: Cleanup

@connect(state => ({user: state.user}))
@autobind
export default class LoginPage extends React.Component {

  render() {
    const {
      dispatch,
      ...rest
    } = this.props;
    return (
      <div>
        <h1>Login</h1>
        <LoginForm
          onSubmit={model => dispatch(Object.assign({type: 'LOGIN_REQUESTED' }, model))}
          {...rest}
        />
      </div>
    );
  }
}