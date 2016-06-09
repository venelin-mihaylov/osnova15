"use strict";
import React from "react";
import {autobind} from "core-decorators";
import UserAction from "actions/UserAction";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";
import MaterialField from "components/MaterialField";
import {Form} from "react-redux-form";

export default class LoginForm extends React.Component {

  render() {
    const {
      onSubmit
    } = this.props;

    return (
      <div>
        <Form model="loginUser" onSubmit={onSubmit}>
          <MaterialField model="loginUser.email">
            <TextField
              required
              hintText="Email"
              floatingTextLabel="Email"
            />
          </MaterialField>

          <br/>

          <MaterialField model="loginUser.password">
            <TextField
              type="password"
              required
              hintText="password"
              floatingTextLabel="Password"
            />
          </MaterialField>

          <br/>

          <RaisedButton
            type="submit"
            label="Login"
            primary={true}
          />
        </Form>
      </div>
    );
  }
}
