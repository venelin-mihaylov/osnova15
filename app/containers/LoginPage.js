"use strict";
import React from "react";
import {connect} from "react-redux";
import {autobind} from "core-decorators";
import ActionType from 'constants/ActionType';
import LoginForm from 'components/LoginForm';

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
          onSubmit={model => dispatch(Object.assign({type: ActionType.LOGIN_USER_REQUESTED}, model))}
          {...rest}
        />
      </div>);
  }
}