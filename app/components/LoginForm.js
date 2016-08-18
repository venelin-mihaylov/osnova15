import React from 'react'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import MaterialField from 'components/MaterialField'
import {Form} from 'react-redux-form'

const LoginForm = ({onSubmit}) => (
  <div>
    <Form model='loginUser' onSubmit={onSubmit}>
      <MaterialField model='loginUser.email'>
        <TextField
          required
          floatingLabelText='Email'
          floatingLabelFixed
        />
      </MaterialField>

      <br />

      <MaterialField model='loginUser.password'>
        <TextField
          type='password'
          required
          floatingLabelText='Password'
          floatingLabelFixed
        />
      </MaterialField>

      <br />

      <RaisedButton
        type='submit'
        label='Login'
        primary
      />
    </Form>
  </div>
)

LoginForm.propTypes = {
  onSubmit: React.PropTypes.func.isRequired
}

export default LoginForm
