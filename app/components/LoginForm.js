import React from "react"
import TextField from "material-ui/TextField"
import RaisedButton from "material-ui/RaisedButton"
import MaterialField from "components/MaterialField"
import {Form} from "react-redux-form"

export default class LoginForm extends React.Component {

  render() {
    const {
      onSubmit
    } = this.props

    return (
      <div>
        <Form model="loginUser" onSubmit={onSubmit}>
          <MaterialField model="loginUser.email">
            <TextField
              required
              floatingTextLabel="Email"
            />
          </MaterialField>

          <br/>

          <MaterialField model="loginUser.password">
            <TextField
              type="password"
              required
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
    )
  }
}
