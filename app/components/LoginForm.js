import React from 'react'
import {Form, Control} from 'react-redux-form'
import {Form as uiForm, Button, Input} from 'semantic-ui-react'

// const LoginForm = ({onSubmit}) => (<Form onSubmit={onSubmit}>
//   <Form.Input label='Email' name='email' />
//   <Form.Input label='Password' name='password' type='password' />
//   <Button type='submit'>Login</Button>
// </Form>)

const LoginForm = ({onSubmit}) => (<Form
  className='ui form'
  onSubmit={onSubmit}
  model='rrf.login'
>
  <uiForm.Group>
    <div className='field'>
      <div className='label'>Email</div>
      <Control.text component={Input} model='rrf.login.email' />
    </div>
    <div className='field'>
      <div className='label'>Email</div>
      <Control.text component={Input} type='password' model='rrf.login.password' />
    </div>
  </uiForm.Group>
  <Button type='submit'>Login</Button>

</Form>)

LoginForm.propTypes = {
  onSubmit: React.PropTypes.func.isRequired
}

export default LoginForm
